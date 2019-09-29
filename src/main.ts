import * as core from '@actions/core';
import * as github from '@actions/github';

async function run() {
  try {
    const token = core.getInput('repo_token', { required: true });
    const deploymentId: number = Number(core.getInput('deployment_id', { required: true }));
    const state = core.getInput('state', { required: true });
    const targetUrl = core.getInput('target_url');
    const logUrl = core.getInput('log_url');

    const client = new github.GitHub(token);

    createDeploymentStatus(client, deploymentId, state, targetUrl, logUrl);

  } catch (error) {
    core.setFailed(error.message);
  }
}

async function createDeploymentStatus(
  client: github.GitHub,
  deploymentId: number,
  state: any,
  targetUrl: string,
  logUrl: string
) {
  const response = await client.repos.createDeploymentStatus({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    deployment_id: deploymentId,
    state: state,
    target_url: targetUrl,
    log_url: logUrl
  });

}

run();

