# Contributing Guide

Thank you so much for your interest! Anything is welcome, however large or small the contribution is. Please read the following to make sure everything is consistent with your contribution.

## Git Strategy

The flow of git should mimic that of a simplified GitHub Flow metholodogy (see https://guides.github.com/introduction/flow/).

- Prod is protected and is always a release.
- Feature branches extend dev, and merge back into dev when they're ready.
- No releases branches; releases will be tagged as dev merges into prod.
- Pull requests are **squash-merged**.

## Branches

`prod` and `dev` are the only "static" branch names. For feature branches, **please follow the naming scheme of `username/feature-here`**.

> For example:
> bananabrann/contributing-guide

## Commits and Content

Please make your commit messages short and concise as possible. This is not going to be policed for right now, but be aware of your commit messsages and make sure every commit is a fully-functional piece of code on its own.

- Content, where applicable, especially if content is documentation, follow the Micrisoft voice principles: https://docs.microsoft.com/en-us/contribute/style-quick-start
- Make your code pretty! There is an action setup that will automatically check your code, but please make sure your code is tidy and follows our Prettier config.

## Issue Templates

There are no issue templates for now. If an issue is a new feature, I might ask you to add some basic information to it.
