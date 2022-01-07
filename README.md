# setup-digitalocean-firewall

![GitHub](https://img.shields.io/github/license/earthpyy/setup-digitalocean-firewall)
![GitHub Workflow Status](https://img.shields.io/github/workflow/status/earthpyy/setup-digitalocean-firewall/CI)
![Node Version](https://img.shields.io/badge/node-17.2-blue)

GitHub Action to add GitHub shared runner IP into DigitalOcean's firewall rule

## Examples

### Basic Usage

```yml
- name: Setup DigitalOcean firewall
  uses: earthpyy/setup-digitalocean-firewall@main
  with:
    access_token: ${{ secrets.DO_ACCESS_TOKEN }}
    firewall_id: eb64eefd-f935-4d75-b0a4-97e3d1dbec87
```

### Custom Protocol/Port

```yml
  with:
    ...
    ports: 22222
    protocol: tcp
```

### Multiple Ports

```yml
  with:
    ...
    ports: '5432,22222'
```

## Inputs

| Key | Type | Required | Default | Description |
| --- | ---- | -------- | ------- | ----------- |
| `access_token` | `string` | Yes | | _DigitalOcean_'s personal access token |
| `firewall_id` | `string` | Yes | | Firewall ID |
| `ports` | `number \| string` | No | `22` | Port(s) to allow |
| `protocol` | `string` | No | `tcp` | Protocol to allow |

## Secrets

| Key | Description |
| --- | ----------- |
| `DO_ACCESS_TOKEN` | _DigitalOcean_'s personal access token |
