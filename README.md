Regex Data Extraction & Validation
Project Overview

This project demonstrates the use of regular expressions (regex) in JavaScript to extract and validate structured data from realistic, unstructured raw text.

The focus is on identifying valid data patterns while ignoring malformed or unsafe input, reflecting real-world scenarios where external APIs may return inconsistent or hostile data.

The implementation validates and extracts four core data types:

Email addresses

URLs

Phone numbers

Time values (12-hour and 24-hour formats)

Input Design & Realism

The input text simulates real production logs from a sales system. It includes:

Multiple sales records in a single text block

Mixed formatting and spacing

Valid and invalid data entries

Security threats such as embedded HTML <script> tags

This ensures the regex patterns are tested against non-trivial, real-world data, not artificial examples.

Data Extraction & Validation
1. Email Address Validation ✅

Regex Used

\b[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z]+(\.[a-zA-Z]+)+\b


What was done well

Enforces exactly one @ symbol

Prevents consecutive dots in the local part

Requires a valid domain structure with one or more domain extensions

Correctly extracts valid emails such as:

mike.buyer@example.com

tom12@company.co.uk

Correctly rejects malformed emails like:

sarah@@mail..com

This approach ensures only well-formed email addresses are extracted.

2. URL Validation ✅

Regex Used

\bhttps?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[^\s<>"]*)?\b


What was done well

Supports both HTTP and HTTPS protocols

Requires a valid domain name with a proper top-level domain

Allows optional subdomains and URL paths

Avoids matching unsafe characters such as < and >

Successfully extracts real URLs like:

https://sales.agro-portal.co.ug/receipt/88921

The regex is structured to reflect how URLs appear in real systems rather than simplified textbook examples.

3. Phone Number Validation ✅

Regex Used

\b(\+?\d{1,3}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]\d{3,4}\b


What was done well

Supports international country codes (e.g. +256)

Accepts common separators:

Spaces

Dots

Hyphens

Supports parentheses around area codes

Successfully extracts realistic phone formats such as:

+256-772-345-678

(256) 701-234-567

Ignores incomplete or malformed phone numbers

This demonstrates awareness of regional and formatting variations in phone numbers.

4. Time Validation (12-hour & 24-hour) ✅

Regex Used

([01][0-9]|2[0-3]):[0-5][0-9]|(1[0-2]|[1-9]):[0-5][0-9]\s(AM|PM)


What was done well

Supports 24-hour format (e.g. 14:30, 08:05)

Supports 12-hour format with AM/PM (e.g. 2:45 PM)

Enforces valid minute ranges (00–59)

Correctly ignores invalid time values such as:

99:99

This ensures only logically valid time values are extracted.

Security Awareness

The input intentionally contains a malicious <script> tag.

HTML tags are detected using:

/<[^>]+>/g


This demonstrates awareness of cross-site scripting (XSS) risks and reinforces that not all input should be trusted, even when processing plain text.