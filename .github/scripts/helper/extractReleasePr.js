module.exports = async ({github, owner, repo, prName}) => {
    const pullRequests = await github.rest.pulls.list({
        owner,
        repo,
        state: 'open',
    });

    return pullRequests.data.find((pr) => pr.title.includes(prName));
}