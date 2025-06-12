# Animated Aquarium

A relaxing animated aquarium scene created with HTML5 Canvas and JavaScript. Features swimming fish, rising bubbles, waving seaweed, and underwater lighting effects.

## Features

- Colorful fish swimming at different depths and speeds
- Rising bubbles with natural movement
- Animated seaweed
- Underwater light effects
- Responsive design that adapts to window size

## Running the Project

Simply open `index.html` in a web browser or serve it through a local HTTP server.

## Audio Setup

To enable background music:
1. Place your underwater ambient music file in the `audio` directory
2. Name it `underwater-ambient.mp3`
3. The music will be available to play via the control panel in the top-right corner

Note: Due to browser security policies, audio will only play after user interaction (clicking the play button).

## How to Update

1. Make your changes to the files
2. Test locally using: `python3 -m http.server 8000`
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your change description"
   git push
   ```
4. The site will automatically redeploy with your changes
