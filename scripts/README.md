# Utility Scripts

This directory contains utility scripts for managing the AlgoVisualizer repository.

## 🔍 check-assigned-issues.cjs

A Node.js script for manually checking the status of assigned issues without running the full automation workflow.

### Usage

```bash
# Basic usage (requires internet access)
node scripts/check-assigned-issues.cjs

# With authentication (for higher rate limits)
export GITHUB_TOKEN="your_github_token_here"
node scripts/check-assigned-issues.cjs

# Get help
node scripts/check-assigned-issues.cjs --help
```

### Features

- **Issue Analysis**: Scans all assigned open issues
- **Day Tracking**: Calculates days since assignment
- **PR Detection**: Checks for linked pull requests
- **Label Exemptions**: Respects priority and work-in-progress labels
- **Summary Reports**: Provides categorized results

### Output Categories

1. **Warning Needed** (5+ days): Issues that need reminder notifications
2. **Unassignment Needed** (7+ days): Issues ready for auto-unassignment  
3. **Exempted Issues**: Issues with special labels that won't be unassigned
4. **Issues with PRs**: Issues that have linked pull requests
5. **Recent Assignments**: Issues still in the grace period

### Environment Variables

- `GITHUB_TOKEN`: Optional GitHub personal access token for authenticated requests
  - Increases rate limits from 60 to 5000 requests per hour
  - Required for private repositories or to avoid rate limiting

### Example Output

```
🔍 Checking assigned issues in RhythmPahwa14/AlgoVisualizer
📋 Found 3 assigned issues

📝 Issue #123: "Add sorting algorithm visualization"
   Assignees: contributor1
   📅 6 days since assignment (Sep 20 2025)
   ⚠️  NEEDS WARNING

📝 Issue #124: "Fix responsive design"
   Assignees: contributor2  
   🏷️  Exempt (has wip label)

📊 SUMMARY REPORT
==================
📝 Total assigned issues: 3
⚠️  Issues needing warning: 1
🔄 Issues needing unassignment: 0
🏷️  Exempted issues: 1
🔗 Issues with PRs: 0
✅ Recent assignments: 1
```

## 🔧 Maintenance

When the auto-unassignment workflow configuration changes, update the constants in this script:
- `WARNING_DAYS`
- `UNASSIGN_DAYS` 
- `EXEMPT_LABELS` array

## 📝 Adding New Scripts

When adding new utility scripts:
1. Use `.cjs` extension for CommonJS or `.mjs` for ES modules
2. Add executable permissions: `chmod +x scripts/your-script.cjs`
3. Include help text with `--help` flag
4. Document in this README
5. Follow the error handling patterns from existing scripts