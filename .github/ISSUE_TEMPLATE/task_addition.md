name: Task Creation
description: Create a task for a bug fix, feature implementation, spike investigation, or security vulnerability fix.
title: "[Task][Type]: "  # Dynamically update based on the task type selected
labels: ["task"]  # Default label, can dynamically update based on task type if handled via GitHub Actions
projects:
  - imperfectandcompany/imperfect-gamers-site/5  # Automatically adds to the Imperfect Gamers Site Development project
body:
  - type: dropdown
    id: task-type
    attributes:
      label: Task Type
      description: Select the type of task you are creating. This choice will determine additional labels and required fields.
      options:
        - Bug Fix
        - Feature Implementation
        - Spike
        - Security Vulnerability Fix
    validations:
      required: true

  - type: input
    id: title
    attributes:
      label: Task Title
      description: Provide a concise title for the task.
    validations:
      required: true

  - type: textarea
    id: description
    attributes:
      label: Task Description
      description: Provide a detailed description of the task.
    validations:
      required: true

  - type: textarea
    id: objective
    attributes:
      label: Objective
      description: What is the goal or expected impact of this task?
    validations:
      required: true

  - type: textarea
    id: reproduction-steps
    attributes:
      label: Reproduction Steps
      description: "(Required for Bug Fixes) Provide steps to reproduce the issue."
    validations:
      required: false  # Conditionally required based on the task type

  - type: textarea
    id: technical-approach
    attributes:
      label: Technical Approach
      description: "(Optional for Features/Spike/Security) Suggest a technical approach or solution for the task."
    validations:
      required: false

  - type: textarea
    id: expected-outcome
    attributes:
      label: Expected Outcome
      description: What is the expected outcome or deliverable of this task? Include performance or integration targets.
    validations:
      required: true

  - type: checkboxes
    id: requirements
    attributes:
      label: Additional Requirements
      description: Please check any that apply to your task. Different task types may trigger different requirements.
      options:
        - label: Requires additional research
        - label: Requires security review
        - label: Needs testing
        - label: Documentation update required
        - label: UI/UX design needed

  - type: textarea
    id: acceptance-criteria
    attributes:
      label: Acceptance Criteria
      description: Define clear criteria for what finishing the task successfully looks like.
    validations:
      required: true

  - type: dropdown
    id: milestone
    attributes:
      label: Link to Milestone
      description: "Select the milestone this task contributes to."
      options:
        - Project Initialization
        - Environment Setup
        - Developer Tooling
        - Authentication System
        - Validation
        - Store Module Functionality
        - User Interface Polish
        - Advanced Features Integration
        - Performance Tuning
        - Preparation for Scale
        - Launch
        - Post-Launch Support and Maintenance
        - Continuous Feedback Implementation
        - Role-Based Access Control
        - Admin Tools and Reviews
        - Pre-Launch Checks

  - type: textarea
    id: notes
    attributes:
      label: Additional Notes
      description: Any other comments or notes related to the task?
    validations:
      required: false

  - type: markdown
    attributes:
      value: "Please ensure all provided information is accurate and complete. Thank you for contributing!"
