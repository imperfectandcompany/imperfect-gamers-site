const github = require('@actions/github');
const core = require('@actions/core');

async function run() {
  const token = core.getInput('github-token');
  const octokit = github.getOctokit(token);
  const { owner, repo } = github.context.repo;
  const issue_number = github.context.issue.number;

  // Define label groups based on issue types and additional requirements
  const labelGroups = {
    'Bug Fix': ['bug'],
    'Feature Implementation': ['enhancement', 'documentation', 'backend', 'api', 'automation', 'testing'],
    'Spike': ['investigation', 'research', 'analytics'],
    'Security Vulnerability Fix': ['security', 'backend'],
    'Additional Requirements': {
      'Requires additional research': ['research', 'analytics', 'investigation'],
      'Requires security review': ['security', 'dependencies'],
      'Needs testing': ['testing', 'ci/cd'],
      'Documentation update required': ['documentation'],
      'UI/UX design needed': ['design', 'frontend', 'ui/ux']
    }
  };

  // Retrieve all current labels in the repository
  const { data: existingLabels } = await octokit.issues.listLabelsForRepo({
    owner,
    repo
  });
  
  const existingLabelNames = existingLabels.map(label => label.name);
  const labelsToAdd = new Set(); // Use a Set to avoid duplicates

  // Get the issue data
  const { data: issue } = await octokit.issues.get({
    owner,
    repo,
    issue_number
  });
  
  // Process labels based on the issue body
  const body = issue.body.toLowerCase();

// Assign labels based on the task type
Object.entries(labelGroups).forEach(([key, values]) => {
  if (typeof values === 'object') {
    // For additional requirements, check if they are mentioned in the body
    Object.entries(values).forEach(([reqKey, reqLabels]) => {
      if (body.includes(reqKey.toLowerCase())) {
        reqLabels.forEach(label => {
          if (existingLabelNames.includes(label)) {
            labelsToAdd.add(label);
          }
        });
      }
    });
  } else {
    // For direct task types
    if (body.includes(key.toLowerCase())) {
      values.forEach(label => {
        if (existingLabelNames.includes(label)) {
          labelsToAdd.add(label);
        }
      });
    }
  }
});



  // Convert Set to array and assign labels
  const labelsToAddArray = Array.from(labelsToAdd);
  if (labelsToAddArray.length > 0) {
    await octokit.issues.addLabels({
      owner,
      repo,
      issue_number,
      labels: labelsToAddArray
    });
    core.info(`Labels added: ${labelsToAddArray.join(', ')}`);
  } else {
    core.info('No valid labels to add based on the issue content.');
  }
}

run().catch(error => {
  core.setFailed(`Action failed with error: ${error.message}`);
  core.error(`Error details: ${error.stack}`);
});
