# Create Deployment Status

Creates or updates a [GitHub deployment status](https://developer.github.com/v3/repos/deployments/#create-a-deployment-status). To create a GitHub deployment use: https://github.com/bas/create-deployment

## Inputs

### `deployment_id`

**Required** The deployment identifier. This value is written to `outputs` by https://github.com/bas/create-deployment using the following format: `steps.<step.id>.outputs.deployment_id`

### `state`

**Required** The state of the status. Can be one of `error`, `failure`, `inactive`, `in_progress`, `queued`, `pending`, or `success`.

### `target_url`

The target URL to associate with this status. This URL should contain output to keep the user updated while the task is running or serve as historical information for what happened in the deployment. Default: `""`.

### `log_url`

The full URL of the deployment's output. This parameter replaces `target_url`. We will continue to accept target_url to support legacy uses, but we recommend replacing `target_url` with `log_url`. Setting `log_url` will automatically set `target_url` to the same value. Default: `""`.

## Example usage

```yaml
- uses: bas/create-deployment-status@v1
    with:
      repo_token: ${{ secrets.GITHUB_TOKEN }}
      deployment_id: ${{ steps.deployment.outputs.deployment_id }}
      state: "success"
```
