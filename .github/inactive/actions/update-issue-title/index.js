const core = require('@actions/core')
const github = require('@actions/github')
const { Octokit } = require('@octokit/rest')

async function run() {
	try {
		// Retrieve input parameters and GitHub token
		const token = core.getInput('GITHUB_TOKEN', {
			required: true,
		})
		const issueNumber = github.context.issue.number // Directly from the GitHub context

		// Initialize Octokit
		const octokit = new Octokit({
			auth: token,
		})

		// Repository information from the GitHub context
		const { owner, repo } = github.context.repo

		// Fetch the issue details
		const { data: issue } = await octokit.rest.issues.get({
			owner: owner,
			repo: repo,
			issue_number: issueNumber,
		})

		// Extract "Task Type" from the issue body
		const match = issue.body.match(/Task Type\n(.*)\n/)
		if (!match) {
			core.setFailed('Task Type not found in the issue body.')
			return
		}

		const taskType = match[1].trim()
		const newTitle = `[${taskType}] ${issue.title}`

		// Update the issue title if necessary
		if (!issue.title.startsWith(`[${taskType}]`)) {
			await octokit.rest.issues.update({
				owner: owner,
				repo: repo,
				issue_number: issueNumber,
				title: newTitle,
			})
			console.log('Issue title updated successfully.')
		} else {
			console.log('No update needed, the title already contains the task type.')
		}

		console.log('Issue title updated successfully.')
	} catch (error) {
		core.setFailed(`An error occurred: ${error.message}`)
	}
}

run()
