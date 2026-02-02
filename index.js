
// 1. Raw input 
const rawText =`
On 12/01/2026 at 14:30, sales agent JohnA23 recorded a sale of 2500kg of maize at the Gulu branch. The buyer, MikeB7, paid UGX 1,250,000 using card number 1234 5678 9012 3456, receipt available at https://sales.agro-portal.co.ug/receipt/88921
. Buyer contact email was mike.buyer@example.com
 and phone number was +256-772-345-678. Another entry shows agent SarahK recorded beans at 2:45 PM with payment UGX 45000 using card 1234-5678-0000-9999 and email sarah@@mail..com, phone 0772.999. A suspicious log entry contained <script>alert('hack')</script> and an invalid time 99:99 with amount UGX. A follow-up sale at 08:05 involved buyer Tom12, email tom12@company.co.uk
, phone (256) 701-234-567, amount UGX 78,500, and reference link http://invalid-url
. On 12/01/2026 at 16:10 PM agent MarkX completed a sale worth UGX 9,000 paid using 4444 3333 2222 1111.`

/* Security and malicious apps
HTML tags are treated as unsafe and ignored to prevent XSS injections
 */
const htmlRegex = /<[^>]+>/g;

const containsMaliciousHTML = htmlRegex.test(rawText);

/*
Email validation:
- must contain one @
- no consecutive dots allowed
- valid domain only

*/
const emailRegex = /\b[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z]+(\.[a-zA-Z]+)+\b/g;

/*
URL validation:
- checks for both http or https
- valid domain with at least one dot
*/
const urlRegex = /\bhttps?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})(\/[^\s<>"]*)?\b/g;

/*
Phone number validation:
- country codes or area codes
- strict digit grouping
*/
const phoneRegex = /\b(\+?\d{1,3}[\s.-]?)?(\(?\d{3}\)?[\s.-]?)\d{3}[\s.-]\d{3,4}\b/g;

/*
the time validation for both 24hrs and 12hrs*/
const timeRegex = /([01][0-9]|2[0-3]):[0-5][0-9]|(1[0-2]|[1-9]):[0-5][0-9]\s(AM|PM)/g;



function extract(pattern, text) {
  const matches = text.match(pattern);
  return matches ? matches : [];
}


const results = {
  emails: extract(emailRegex, rawText),
  urls: extract(urlRegex, rawText),
  phones: extract(phoneRegex, rawText),
  times: extract(timeRegex, rawText),
};

console.log(JSON.stringify(results, null, 2));

