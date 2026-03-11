#!/bin/bash
# Pre-commit AI review hook
# Triggers when Claude attempts to run git commit

set -e

# Parse the tool input to check if it's a git commit command
TOOL_INPUT="$CLAUDE_TOOL_INPUT"

# Only trigger for git commit commands
if ! echo "$TOOL_INPUT" | grep -qE 'git\s+commit'; then
  exit 0
fi

# Get staged changes
STAGED_DIFF=$(git diff --cached --stat 2>/dev/null || echo "")

if [ -z "$STAGED_DIFF" ]; then
  echo "No staged changes to review."
  exit 0
fi

# Output review request
cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║  🔍 PRE-COMMIT AI REVIEW TRIGGERED                           ║
╠══════════════════════════════════════════════════════════════╣
║  Before committing, please review the staged changes for:    ║
║  • Security issues (hardcoded secrets, unsafe patterns)      ║
║  • Type safety violations (any, unsafe assertions)           ║
║  • Missing error handling                                    ║
║  • Code style consistency                                    ║
╚══════════════════════════════════════════════════════════════╝
EOF

echo ""
echo "📁 Staged files:"
echo "$STAGED_DIFF"
echo ""
echo "💡 Run 'git diff --cached' to see full changes before proceeding."
