For UBCEA Club Members - Filing issues & bug reports
--------------
- Please thoroughly examine [open issues](https://github.com/ubcesports/lounge-hub/issues) to ensure that your problem/suggestion hasn't already been reported.
- Limit one issue for one purpose, if you have several suggestions please file multiple follow-up issues.
- Feel free to react to existing issues or chime into the discussion if something is important to you, popular issues will get more attention from the team.
- Keep issues technical. For general inquiries or FAQ, please reach out to the dev team on our slack/discord instead.

### Issue template, file to [issues](https://github.com/ubcesports/lounge-hub/issues)
**Title**: Bug report or feature request, be clear and concise.
**About**: Describe, to the best of your ability the bug or feature. 
- For bugs: make sure to include an MRE (Minimally Reproducible Example) if appropriate. The dev team will have a much easier time diagnosing and fixing the issue if you can include the steps that lead to a bug. 
- For feature requests: if at all possible, come up with a scenario or user story (ie, As a user, I want to be able to...) for the feature. Well thought-out feature requests usually garner more attention and are prioritized.

For Devs - Writing Pull Requests (PRs)
------------
These guidelines assume a basic understanding of GitHub issues and PR reviewing. For more information on this, you can read:
- https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues
- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews

Contributing guidelines (Devs please read through at least once):
3. LLMs: you are welcome to use AI if you fully understand the drawbacks and use them as tools. Explaining code, thinking of test cases and pseudo-code/examples for implementing a feature is fine. You are responsible as a contributor for the security of the code you write, therefore we __strongly__ discourage copy/pasting code from LLMs for which you cannot verify the code license or provide proper citation. You can read more about this topic via this [Hacker News thread](https://news.ycombinator.com/item?id=33240341). 

#### Creating PRs

All changes must be made through PRs. There will be no force-pushing to main tomfoolery here. Members of the ubcea-admin team (for 2024, Jaden and Josh) have the ability to bypass these rules, but should not unless in an emergency.

In general, make one PR for one issue. If your PR covers two issues that are closely related but not duplicates, it is fine to close both. Make sure to include a "Closes #(Issue Number)" **for each linked issue** in your PR description so GitHub knows to automatically close the linked issue when your PR is merged.

If you are confident, it is okay to create a PR that doesn't have an existing open issue. Self-contained PRs are welcome/easier to review as well. Make sure to describe thoroughly the changes and motivation in your PR description with examples, images and text.

Please make changes against the `main` branch. You can do this by creating a new branch to make your changes with `git checkout -b "the-name-of-your-branch"`. When you push your changes, you will be able to find your branch on GitHub at https://github.com/ubcesports/lounge-hub/branches, where you can create a PR. 

(If you happen to accidentally write all your changes on the main branch, don't worry, just `git stash`, `git checkout -b "new-branch"`, and then `git stash pop`).

### PR template


Please please please, use the **squash & merge** button when merging PRs. This keeps our commit history clean by only showing one commit per PR.

