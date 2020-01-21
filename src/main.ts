import * as core from "@actions/core";
import * as github from "@actions/github";

type DeploymentStatusState =
  | "error"
  | "failure"
  | "inactive"
  | "in_progress"
  | "queued"
  | "pending"
  | "success";

function asDeploymentStatusState(value: string): DeploymentStatusState {
  switch (value) {
    case "error":
    case "failure":
    case "inactive":
    case "in_progress":
    case "queued":
    case "pending":
    case "success":
      return value;
  }

  throw new Error("Unknown deployment status");
}

async function run() {
  try {
    const token = core.getInput("repo_token", { required: true });
    const deploymentId: number = Number(
      core.getInput("deployment_id", { required: true })
    );
    const state: DeploymentStatusState = asDeploymentStatusState(
      core.getInput("state", { required: true })
    );
    const targetUrl = core.getInput("target_url");
    const logUrl = core.getInput("log_url");

    const client = new github.GitHub(token);

    createDeploymentStatus(client, deploymentId, state, targetUrl, logUrl);
  } catch (error) {
    core.setFailed(error.message);
  }
}

async function createDeploymentStatus(
  client: github.GitHub,
  deploymentId: number,
  state: DeploymentStatusState,
  targetUrl: string,
  logUrl: string
) {
  var mediaType = "";
  if (state === "inactive") {
    mediaType = "application/vnd.github.ant-man-preview+json";
  } else if (state === "in_progress" || state == "queued") {
    mediaType = "application/vnd.github.flash-preview+json";
  }

  const response = await client.repos.createDeploymentStatus({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    deployment_id: deploymentId,
    state: state,
    target_url: targetUrl,
    log_url: logUrl,
    mediaType: {
      format: mediaType
    }
  });
}

run();
