
# eCSScape Room

A browser escape-room game that runs without JavaScript.

This project is currently in its very beginning phase. The story has yet to be thought out, the main mechanics are still being explored, and the project architecture and build process are still in the works. I definitely see myself needing help with the story-writing and with the artwork to achieve the level of polish I'm imagining. Once I have prototyped those things and set some baselines, I will open up to ideas, feedback, and contributions.

Part of my personal motivation here is to learn React (albeit without any reactivity at runtime), and to play with CSS and make it do amazing things. I want to make something that is delightful to play even for a non-technical audience, and (hopefully) awe-inspiring to frontend web-developers.

The build process here is very different than that of my other large web-project, [snakey](https://github.com/david-fong/snakey3), which uses WebPack. Instead, since the end-goal is to generate static html with _no JavaScript_, this project uses ts-node and a combination of require-hooks and a typescript plugin for CSS modules.
