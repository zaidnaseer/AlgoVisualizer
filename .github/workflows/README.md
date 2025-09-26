# GitHub Actions Workflows

This directory contains automated workflows that help maintain the AlgoVisualizer repository.

## 🤖 Active Workflows

### 1. Auto Unassign Stale Issues
**File**: `auto-unassign-stale-issues.yml`  
**Schedule**: Daily at 9:00 AM UTC  
**Purpose**: Automatically unassigns contributors from issues after 7 days of inactivity

**Features**:
- 5-day warning notification
- 7-day automatic unassignment 
- Checks for linked PRs before unassigning
- Respects exempt labels (`wip`, `on-hold`, `priority-high`, etc.)
- Detailed logging and reporting

### 2. Test Auto Unassign (Manual)
**File**: `test-auto-unassign.yml`  
**Trigger**: Manual workflow dispatch  
**Purpose**: Test the auto-unassignment logic without making actual changes

**Options**:
- Dry run mode (default: enabled)
- Configurable warning/unassignment days
- Detailed analysis and reporting

### 3. Issue Creation Messages
**File**: `issue-create-automate-message.yml`  
**Trigger**: When new issues are opened  
**Purpose**: Welcome new contributors with helpful information

### 4. PR Creation Messages  
**File**: `pr-create-automate-message.yml`  
**Trigger**: When new PRs are opened  
**Purpose**: Thank contributors and provide review guidance

## 🔧 Configuration

### Auto-Unassignment Settings
The auto-unassignment workflow can be customized by editing the workflow file:

```yaml
# Timing (in days)
WARNING_DAYS: 5      # Warning notification 
UNASSIGN_DAYS: 7     # Automatic unassignment

# Exempt labels (issues with these labels won't be unassigned)
EXEMPT_LABELS: ['on-hold', 'wip', 'priority-high', 'priority-critical']
```

### Testing
Use the test workflow to validate changes before they affect real issues:

1. Go to Actions tab → "Test Auto Unassign (Manual)"
2. Click "Run workflow" 
3. Configure test parameters
4. Review the output logs

## 📊 Monitoring

All workflows provide detailed logging accessible through the Actions tab. Key information includes:
- Number of issues processed
- Actions taken (warnings, unassignments)
- Issues skipped and reasons
- Error reporting

## 🚀 Benefits

- **Keeps issues active**: Prevents stale assignments that block other contributors
- **Improves contributor flow**: Makes issues available for active contributors  
- **Maintains engagement**: Gentle reminders encourage regular updates
- **Respects priorities**: High-priority and work-in-progress issues are protected
- **Full transparency**: Complete audit trail of all automated actions

## 📝 Contributing to Workflows

When modifying workflows:
1. Test thoroughly using the manual test workflow
2. Update documentation in this README
3. Consider backward compatibility
4. Add proper error handling and logging

For questions about these workflows, please open an issue or discuss in PRs.