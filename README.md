# setup-digitalocean-firewall

![GitHub](https://img.shields.io/github/license/earthpyy/setup-digitalocean-firewall)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/earthpyy/setup-digitalocean-firewall/CI)
![Node Version](https://img.shields.io/badge/node-16-blue)

GitHub Action to add GitHub shared runner IP into DigitalOcean's firewall rule

## Examples

### Basic Usage

```yml
- name: Setup DigitalOcean firewall
  uses: earthpyy/setup-digitalocean-firewall@main
  with:
    access-token: ${{ secrets.DO_ACCESS_TOKEN }}
    firewall-id: eb64eefd-f935-4d75-b0a4-97e3d1dbec87
```

### Custom Protocol/Port

```yml
  with:
    ...
    ports: '22222'
    protocol: tcp
```

### Multiple Ports

```yml
  with:
    ...
    ports: '5432,22222'
```

## Inputs

| Key | Required | Default | Description |
| --- | -------- | ------- | ----------- |
| `access-token` | Yes | | _DigitalOcean_'s personal access token |
| `firewall-id` | Yes | | Firewall ID |
| `ports` | No | `22` | Port(s) to allow |
| `protocol` | No | `tcp` | Protocol to allow |
| `dry-run` | No | `false` | Dry run (no firewall change) |

## Secrets

| Key | Description |
| --- | ----------- |
| `DO_ACCESS_TOKEN` | _DigitalOcean_'s personal access token |

## Outputs

| Key | Example | Description |
| --- | ------- | ----------- |
| `runner-ip` | `1.2.3.4` | IP of GitHub shared runner |
