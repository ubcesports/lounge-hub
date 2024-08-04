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

Checklist:
- I have searched the NEWS file to check if the feature/bug has been resolved in the development version.
- Looked through active issues to ensure that my issue isn't a duplicate.
- (For bugs) Included a MRE to help developers recreate and debug.
- (For FRs) Included a convincing description of the feature I want.

For Devs - Writing Pull Requests (PRs)
------------
This guide assume a basic understanding of GitHub issues and PR reviewing. For more information on this, you can read:
- https://docs.github.com/en/issues/tracking-your-work-with-issues/about-issues
- https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests/about-pull-request-reviews


### Dev environment

Make sure you have the latest version of `npm` and `node` installed! These things are much easier to install/update with Linux, and I (Josh) highly recommend using a Linux environment to make things easier for yourself. Personally, I use WSL on Visual Studio Code on my Windows PC to simulate a Linux environment. If you are interested in this, please see https://code.visualstudio.com/docs/remote/wsl.

Note that there may be issues with this system and Riot Vanguard/Windows 11, so if you want to use WSL and play League or Val, let me (Josh) know and I can help you with setting it up.

### AI

You are welcome to use AI if you fully understand the drawbacks and use them as tools. Explaining code, thinking of test cases and pseudo-code/examples for implementing a feature is fine and encouraged. You are responsible as a contributor for the security of the code you write, therefore we **strongly discourage** copy/pasting code from LLMs for which you cannot verify the code license or provide proper citation. You can read more about this topic via this [Hacker News thread](https://news.ycombinator.com/item?id=33240341). 

### Creating PRs - Notes

All changes must be made through PRs. There will be no force-pushing to main tomfoolery here. Members of the ubcea-admin team (for 2024, Jaden and Josh) have the ability to bypass these rules, but should not unless in an emergency.

Our rule-set for this repository is that every PR requires **at least** one approving review before merge, along with passing CI checks. 

In general, make one PR for one issue. If your PR covers two issues that are closely related but not duplicates, it is fine to close both. Make sure to include a "Closes #(Issue Number)" **for each linked issue** in your PR description so GitHub knows to automatically close the linked issue when your PR is merged.

If you are confident, it is okay to create a PR that doesn't have an existing open issue. Self-contained PRs are welcome/easier to review as well. Make sure to describe thoroughly the changes and motivation in your PR description with examples, images and text.

Please make changes against the `main` branch. You can do this by creating a new branch to make your changes with `git checkout -b "the-name-of-your-branch"`. When you push your changes, you will be able to find your branch on GitHub at https://github.com/ubcesports/lounge-hub/branches, where you can create a PR.

If you happen to accidentally write all your changes on the main branch, don't worry, just `git stash`, `git checkout -b "the-name-of-your-branch"`, and then `git stash pop`.

Every PR for a bug/feature must have a corresponding set of tests. Make sure your code is well-tested and well-documented. It is also encouraged to add comments to tests that link back to the original issue/PR so we can easily find it in the future, instead of having to resort to blame or bisect.

### PR example

Participate in discussion on an open issue, state that you are going to work on it or assign yourself to the issue. If you received a bug report or FR from slack/discord, feel free to file an issue in place of the original author.

Follow instructions to set up the development environment in project README.

```Shell
git checkout -b "branch-name"
```

Make your changes, add tests.
Once we have our testing framework set up, make sure to run our complete test suite as well.

```Shell
git add .
git commit -m "commit message"
git push --set-upstream origin branch-name
```
Create a PR with a clear and concise title, and a good description of changes aided by pictures and examples when appropriate.

Request reviews, run CI tests and make corresponding changes. Jaden and I are always happy to do reviews. Even if you are not specifically requested to make a review, check out the diff and make suggestions if you see any way the code can be improved anyways, this is helpful for everyone!

```Shell
git add .
git commit -m "review suggestions"
git push 
```

If your PR is non-trivial, please include a NEWS entry where you concisely describe the changes that you made. This helps keep documentation on changes clear for users.

Please please please, use the **squash & merge** button when merging PRs. This keeps our commit history clean by only showing one commit per PR.

### Code Style / Good programing practices

Not fully decided yet, but here are a few small things, will update in the future.

Here's a pretty good guide I found online for JavaScript programming style, we'll see if we need to implement a style check in the future but this is a good start: https://developer.mozilla.org/en-US/docs/MDN/Writing_guidelines/Writing_style_guide/Code_style_guide/JavaScript

Spacing:
- 2-space indentation.
- No trailing whitespace.
- If appropriate, use vertical alignment to make reading tests/code easier.
- Use a space between assignment operators.
- Add a space between `if` and opening bracket, and before curly bracket: `if (condition) {`
- Have an empty new line at the end of each file.

Readability:
- In production, readability/simplicity is almost always preferred over performance and cheeky tricks. For example, `x * 2` is preferred over `x << 1` because it is easier to read, even if it is slightly slower.
> "Premature optimization is the root of all evil in programming" - Donald Knuth in his book, The Art of Computer Programming.
- Variable/function names should be clear, not short. Everyone (including future you) would much prefer `startTime = wallClock();` over `t = wallClock()` as the codebase expands.
- Make sure to scope your code appropriately. Really think about whether you **need** a global flag, or if an internal variable is good enough.
- Read your code out loud. A trick I like to use is to read code like a sentence. For example, `for (const number of numberList) { ... }` reads: for number of number list, do...

Documentation:
- The goal is to have "self-documenting" code in our codebase. Meaning, our code is so readable that we don't have to explicitly document the behavior of every function.
- If your code is complex/obscure in its implementation and there's no easy way around it, make sure to add comments.
- Keep function implementations short. If your implementation goes beyond 25 lines, consider creating helpers.
