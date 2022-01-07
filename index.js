const axios = require('axios').default
const core = require('@actions/core')
const github = require('@actions/github')

ALLOWED_PROTOCOLS = ['tcp', 'udp']

const accessToken = core.getInput('access-token', { required: true })
const firewallId = core.getInput('firewall-id', { required: true })
const dryRun = core.getBooleanInput('dry-run')

/**
 * Parse ports from string. This also add protocol if not specified.
 * @param { string } ports Ports as string, separated by comma.
 * @returns { string[] } Ports with protocol
 */
async function parsePorts(ports) {
  return ports.split(',').map((port) => {
    if (!port.includes('/')) {
      return `${port}/tcp`
    }

    return port
  })
}

/**
 * Get current IP
 * @returns {string} Current IP
 */
async function getIP() {
  const response = await axios.get('https://api.ipify.org')
  return response.data
}

/**
 *
 * @param { 'add' | 'delete' } method Action to do with firewall rules
 * @param { { protocol: string, ports: string, sources: { addresses: string[] } } } rules Inbound rules to add/delete
 * @returns
 */
async function updateFirewallRules(method, rules) {
  const httpMethod = method === 'add' ? 'post' : 'delete'
  const payload = {
    inbound_rules: rules,
  }

  core.info(`Rules to ${method}: ${rules}`)

  if (!dryRun) {
    await axios[httpMethod](`https://api.digitalocean.com/v2/firewalls/${firewallId}/rules`, payload, {
      responseType: 'json',
    })

    core.info('Sent')
  } else {
    core.info('Done (dry run)')
  }
}

async function main() {
  const ports = parsePorts(core.getInput('ports'))

  const ip = await getIP()
  core.info(`Current IP: ${ip}`)
  core.setOutput('runner-ip', ip)

  const inboundRules = ports.map((port) => ({
    protocol: port.split('/')[1],
    ports: port.split('/')[0],
    sources: {
      addresses: [ip],
    },
  }))

  await updateFirewallRules('add', inboundRules)
}

try {
  main()
} catch (error) {
  core.setFailed(error.message)
}
