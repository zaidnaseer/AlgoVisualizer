#!/usr/bin/env node

/**
 * Utility script for checking assigned issue status
 * Usage: node scripts/check-assigned-issues.js
 * 
 * This script provides a manual way to check the status of assigned issues
 * without running the full automation workflow.
 */

const https = require('https');

const REPO_OWNER = 'RhythmPahwa14';
const REPO_NAME = 'AlgoVisualizer';
const WARNING_DAYS = 5;
const UNASSIGN_DAYS = 7;

async function makeGitHubRequest(path) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: path,
      method: 'GET',
      headers: {
        'User-Agent': 'AlgoVisualizer-Issue-Checker',
        'Accept': 'application/vnd.github+json'
      }
    };

    // Add auth header if token is available
    if (process.env.GITHUB_TOKEN) {
      options.headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

async function checkAssignedIssues() {
  console.log('🔍 Checking assigned issues in', `${REPO_OWNER}/${REPO_NAME}`);
  
  try {
    // Get all open issues
    const issues = await makeGitHubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/issues?state=open&per_page=100`);
    
    const assignedIssues = issues.filter(issue => 
      issue.assignees && 
      issue.assignees.length > 0 && 
      !issue.pull_request
    );

    if (assignedIssues.length === 0) {
      console.log('✅ No assigned issues found.');
      return;
    }

    console.log(`📋 Found ${assignedIssues.length} assigned issues\n`);

    const now = new Date();
    const results = {
      warningNeeded: [],
      unassignNeeded: [],
      exempted: [],
      withPRs: [],
      recent: []
    };

    for (const issue of assignedIssues) {
      console.log(`📝 Issue #${issue.number}: "${issue.title}"`);
      console.log(`   Assignees: ${issue.assignees.map(a => a.login).join(', ')}`);

      // Check exempt labels
      const EXEMPT_LABELS = ['on-hold', 'wip', 'priority-high', 'priority-critical'];
      const hasExemptLabel = issue.labels.some(label => 
        EXEMPT_LABELS.includes(label.name.toLowerCase())
      );

      if (hasExemptLabel) {
        console.log(`   🏷️  Exempt (has ${issue.labels.find(l => EXEMPT_LABELS.includes(l.name.toLowerCase())).name} label)`);
        results.exempted.push(issue.number);
        continue;
      }

      // Get events to find assignment date
      try {
        const events = await makeGitHubRequest(`/repos/${REPO_OWNER}/${REPO_NAME}/issues/${issue.number}/events`);
        const assignmentEvents = events.filter(event => event.event === 'assigned')
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

        if (assignmentEvents.length === 0) {
          console.log(`   ❓ No assignment event found`);
          continue;
        }

        const lastAssignedDate = new Date(assignmentEvents[0].created_at);
        const daysSinceAssignment = Math.floor((now - lastAssignedDate) / (1000 * 60 * 60 * 24));

        console.log(`   📅 ${daysSinceAssignment} days since assignment (${lastAssignedDate.toDateString()})`);

        // Check for linked PRs (simplified check)
        const searchResults = await makeGitHubRequest(
          `/search/issues?q=repo:${REPO_OWNER}/${REPO_NAME}+is:pr+is:open+${issue.number}`
        );
        
        if (searchResults.total_count > 0) {
          console.log(`   🔗 Has ${searchResults.total_count} linked PR(s)`);
          results.withPRs.push({
            issue: issue.number,
            prs: searchResults.items.map(pr => pr.number)
          });
          continue;
        }

        // Categorize by days
        if (daysSinceAssignment >= UNASSIGN_DAYS) {
          console.log(`   🔄 NEEDS UNASSIGNMENT`);
          results.unassignNeeded.push({
            number: issue.number,
            assignees: issue.assignees.map(a => a.login),
            days: daysSinceAssignment
          });
        } else if (daysSinceAssignment >= WARNING_DAYS) {
          console.log(`   ⚠️  NEEDS WARNING`);
          results.warningNeeded.push({
            number: issue.number,
            assignees: issue.assignees.map(a => a.login),
            days: daysSinceAssignment
          });
        } else {
          console.log(`   ✅ Still in grace period`);
          results.recent.push({
            number: issue.number,
            days: daysSinceAssignment
          });
        }

        // Add small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

      } catch (error) {
        console.log(`   ❌ Error checking issue: ${error.message}`);
      }

      console.log(''); // Empty line for readability
    }

    // Summary report
    console.log('\n📊 SUMMARY REPORT');
    console.log('==================');
    console.log(`📝 Total assigned issues: ${assignedIssues.length}`);
    console.log(`⚠️  Issues needing warning: ${results.warningNeeded.length}`);
    console.log(`🔄 Issues needing unassignment: ${results.unassignNeeded.length}`);
    console.log(`🏷️  Exempted issues: ${results.exempted.length}`);
    console.log(`🔗 Issues with PRs: ${results.withPRs.length}`);
    console.log(`✅ Recent assignments: ${results.recent.length}`);

    if (results.warningNeeded.length > 0) {
      console.log('\n⚠️  WARNING NEEDED:');
      results.warningNeeded.forEach(item => {
        console.log(`   #${item.number} (${item.assignees.join(', ')}) - ${item.days} days`);
      });
    }

    if (results.unassignNeeded.length > 0) {
      console.log('\n🔄 UNASSIGNMENT NEEDED:');
      results.unassignNeeded.forEach(item => {
        console.log(`   #${item.number} (${item.assignees.join(', ')}) - ${item.days} days`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Help text
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🔍 Assigned Issues Checker for AlgoVisualizer

Usage: node scripts/check-assigned-issues.js

Environment Variables:
  GITHUB_TOKEN    Optional GitHub token for authenticated requests (increases rate limits)

This script checks all assigned issues and reports their status:
- Issues needing warning (${WARNING_DAYS}+ days)
- Issues needing unassignment (${UNASSIGN_DAYS}+ days)  
- Exempted issues (with special labels)
- Issues with linked PRs
- Recent assignments (still in grace period)

Example:
  export GITHUB_TOKEN="your_token_here"
  node scripts/check-assigned-issues.js
`);
  process.exit(0);
}

// Run the check
checkAssignedIssues();