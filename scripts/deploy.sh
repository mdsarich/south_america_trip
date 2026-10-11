#!/usr/bin/env bash
set -e

echo "Building production PWA..."
npm run build
touch dist/.nojekyll

echo "Preparing deployment worktree..."
WORKTREE_DIR=$(mktemp -d)
git worktree add -B gh-pages "$WORKTREE_DIR"
rm -rf "$WORKTREE_DIR"/*
cp -r dist/* "$WORKTREE_DIR"/
cp dist/.nojekyll "$WORKTREE_DIR"/

cd "$WORKTREE_DIR"
git add --all
git commit -m "Deploy to gh-pages $(date +'%Y-%m-%d %H:%M:%S')" || echo "No changes to commit"
git push origin gh-pages --force

cd - > /dev/null
git worktree remove "$WORKTREE_DIR" --force

echo "Deployment complete! Live at https://mdsarich.github.io/south_america_trip/"
