const extractReleasePr = require('./helper/extractReleasePr');

/**
 * This script adds the label 'automerge' to the release PR.
 * @param github {import('@actions/github').GitHub}
 * @param context {import('@actions/github').context}
 * @param core {import('@actions/core').Core}
 * @param prName {string}
 */
module.exports = async ({github, context, core, prName}) => {
    const { owner, repo } = context.repo;
    const releasePr = await extractReleasePr({github, owner, repo, prName});

    if (releasePr) {
        core.notice(`Found release PR: ${releasePr.number}`);

        await github.rest.issues.addLabels({
            issue_number: releasePr.number,
            owner,
            repo,
            labels: ['automerge']
        })

        core.notice('Added label to release PR');
        core.setOutput('labelAdded', 'true');
    } else {
        core.notice('No release PR found');
        core.setOutput('labelAdded', 'false');
    }
}
