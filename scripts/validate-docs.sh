#!/bin/bash

# Documentation Validation Script
# Run this locally before committing changes to catch issues early

set -e

echo "🔍 Celo Documentation Validation Script"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Track overall success
ALL_PASSED=true

# Check if Mintlify CLI is installed
echo "Checking for Mintlify CLI..."
if ! command -v mint &> /dev/null; then
    echo -e "${RED}❌ Mintlify CLI is not installed${NC}"
    echo "Install it with: npm install -g mintlify"
    exit 1
fi
echo -e "${GREEN}✅ Mintlify CLI found${NC}"
echo ""

# Check if jq is installed
echo "Checking for jq..."
if ! command -v jq &> /dev/null; then
    echo -e "${YELLOW}⚠️  jq is not installed (optional, for JSON validation)${NC}"
    echo "Install it with: brew install jq (macOS) or apt-get install jq (Linux)"
    JQ_AVAILABLE=false
else
    echo -e "${GREEN}✅ jq found${NC}"
    JQ_AVAILABLE=true
fi
echo ""

# Validate docs.json
echo "1️⃣  Validating docs.json..."
if [ ! -f "docs.json" ]; then
    echo -e "${RED}❌ docs.json not found!${NC}"
    ALL_PASSED=false
else
    if [ "$JQ_AVAILABLE" = true ]; then
        if jq empty docs.json 2>&1; then
            echo -e "${GREEN}✅ docs.json is valid JSON${NC}"
            
            # Check for required fields
            if jq -e '.name' docs.json > /dev/null 2>&1; then
                echo -e "${GREEN}✅ Required 'name' field present${NC}"
            else
                echo -e "${RED}❌ Missing required 'name' field${NC}"
                ALL_PASSED=false
            fi
        else
            echo -e "${RED}❌ docs.json has invalid JSON syntax${NC}"
            ALL_PASSED=false
        fi
    else
        echo -e "${YELLOW}⚠️  Skipping JSON validation (jq not available)${NC}"
    fi
fi
echo ""

# Check for broken links
echo "2️⃣  Checking for broken links..."
# Capture output and check for "found" message
# Temporarily disable exit on error to capture output even if command fails
set +e
BROKEN_LINKS_OUTPUT=$(mint broken-links 2>&1)
BROKEN_LINKS_EXIT_CODE=$?
set -e

echo "$BROKEN_LINKS_OUTPUT"

if [ $BROKEN_LINKS_EXIT_CODE -ne 0 ] || echo "$BROKEN_LINKS_OUTPUT" | grep -q "found [1-9][0-9]* broken link"; then
    echo -e "${RED}❌ Broken links detected! See output above.${NC}"
    ALL_PASSED=false
elif echo "$BROKEN_LINKS_OUTPUT" | grep -q "found 0 broken links"; then
    echo -e "${GREEN}✅ No broken links found!${NC}"
else
    echo -e "${GREEN}✅ No broken links found!${NC}"
fi
echo ""

# Check for missing MDX files
echo "3️⃣  Checking for missing MDX files..."
if [ "$JQ_AVAILABLE" = true ]; then
    MISSING_FILES=0
    
    # Extract all page references and check if files exist
    jq -r '.. | .pages? // empty | .[] | select(type == "string")' docs.json 2>/dev/null | while read -r page; do
        file_path="${page}.mdx"
        
        if [ ! -f "$file_path" ] && [ ! -f "${page}.md" ]; then
            echo -e "${YELLOW}⚠️  Missing file: $file_path${NC}"
            MISSING_FILES=$((MISSING_FILES + 1))
        fi
    done
    
    if [ $MISSING_FILES -eq 0 ]; then
        echo -e "${GREEN}✅ All referenced MDX files exist${NC}"
    else
        echo -e "${YELLOW}⚠️  Some referenced files are missing${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  Skipping MDX file check (jq not available)${NC}"
fi
echo ""

# Check for common syntax issues
echo "4️⃣  Checking for common MDX syntax issues..."
SYNTAX_ISSUES=0

# Find all MDX files (excluding hidden directories and node_modules)
while IFS= read -r file; do
    # Skip if in node_modules or hidden directories
    if [[ "$file" == *"node_modules"* ]] || [[ "$file" == *"/.git/"* ]] || [[ "$file" == *"/_deprecated/"* ]]; then
        continue
    fi
    
    # Check for obvious syntax errors (self-closing tags that are malformed)
    # Look for tags like <Component with no closing > or />
    if grep -E '<[A-Z][a-zA-Z]*\s+[^>]*$' "$file" | grep -v '>' > /dev/null 2>&1; then
        # Only flag if the line truly doesn't have a closing bracket
        if grep -E '<[A-Z][a-zA-Z]*\s+[a-zA-Z]+=' "$file" | grep -vE '(>|/>)\s*$' > /dev/null 2>&1; then
            echo -e "${YELLOW}⚠️  Potential syntax issue in: $file${NC}"
            SYNTAX_ISSUES=$((SYNTAX_ISSUES + 1))
        fi
    fi
done < <(find . -type f \( -name "*.mdx" -o -name "*.md" \) 2>/dev/null)

if [ $SYNTAX_ISSUES -eq 0 ]; then
    echo -e "${GREEN}✅ No obvious syntax issues detected${NC}"
else
    echo -e "${YELLOW}⚠️  Found $SYNTAX_ISSUES potential syntax issue(s)${NC}"
    echo "   (Note: Multi-line JSX components are properly handled)"
fi
echo ""

# Summary
echo "========================================"
echo "📊 Summary"
echo "========================================"
if [ "$ALL_PASSED" = true ]; then
    echo -e "${GREEN}🎉 All checks passed! Your documentation looks good.${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some checks failed. Please fix the issues above before committing.${NC}"
    exit 1
fi
