// Wait for the DOM to be fully loaded before running script
document.addEventListener('DOMContentLoaded', () => {
    // Type-safe references to DOM elements
    const generateBtn = document.getElementById('generateBtn') as HTMLButtonElement | null;
    const copyBtn = document.getElementById('copyBtn') as HTMLButtonElement | null;

    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const titleInput = document.getElementById('title') as HTMLInputElement | null;
    const mobileInput = document.getElementById('mobile') as HTMLInputElement | null;
    const officeInput = document.getElementById('office') as HTMLInputElement | null;
    // Standard logo path (relative to index.html)
    const LOGO_URL = "assets/logo.png"; // Update filename if needed
    const STANDARD_TAGLINE = "Crafting Impact Together"; // Update this string as needed

    const linkedinInput = document.getElementById('linkedin') as HTMLInputElement | null;
    const twitterInput = document.getElementById('twitter') as HTMLInputElement | null;
    const instagramInput = document.getElementById('instagram') as HTMLInputElement | null;


    const signaturePreview = document.getElementById('signaturePreview') as HTMLElement | null;
    const htmlOutput = document.getElementById('htmlOutput') as HTMLTextAreaElement | null;

    // Event listener for the generate button
    if (generateBtn) generateBtn.addEventListener('click', generateSignature);
    // Event listener for the copy button
    if (copyBtn) copyBtn.addEventListener('click', copyHtmlToClipboard);

    // Automatically update preview as user types in any input field
    const allInputs = document.querySelectorAll<HTMLInputElement>('.form-container input');
    allInputs.forEach(input => {
        input.addEventListener('input', generateSignature); // Live update
    });

    /**
     * Main function to generate the email signature HTML.
     * It gathers data from input fields and constructs the HTML string.
     */
    function generateSignature(): void {
        // Retrieve and trim values from input fields
        const name = nameInput ? nameInput.value.trim() : '';
        const title = titleInput ? titleInput.value.trim() : '';
        const mobile = mobileInput ? mobileInput.value.trim() : '';
        const office = officeInput ? officeInput.value.trim() : '';
        // Use standard logo URL and tagline
        const logoUrl = LOGO_URL;
        const tagline = STANDARD_TAGLINE;
        const linkedin = linkedinInput ? linkedinInput.value.trim() : '';
        const twitter = twitterInput ? twitterInput.value.trim() : '';
        const instagram = instagramInput ? instagramInput.value.trim() : '';

        // --- Start Signature HTML Construction ---
        // This HTML is designed for maximum email client compatibility.
        // It uses tables for layout and inline CSS styles.
        let signatureHtml = `
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #333333; line-height: 1.4;">
  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: auto;">
    <tr>`;

        // Always add the standard logo
        signatureHtml += `
      <td style="padding-right: 15px; vertical-align: top; width: 80px;">
        <img src="${logoUrl}" alt="Logo" style="width: 75px; height: auto; border: 0; display: block; max-width: 75px;">
      </td>`;

        signatureHtml += `
      <td style="vertical-align: top;">`;

        // Add name
        if (name) {
            signatureHtml += `<p style="margin: 0 0 2px 0; font-size: 12pt; font-weight: bold; color: #222222;">${name}</p>`;
        }
        // Add title
        if (title) {
            signatureHtml += `<p style="margin: 0 0 5px 0; font-size: 10pt; color: #555555;">${title}</p>`;
        }
        // Add standard tagline
        if (tagline) {
            signatureHtml += `<p style="margin: 0 0 8px 0; font-size: 9pt; font-style: italic; color: #444444;">${tagline}</p>`;
        }

        // Contact Information (Mobile, Office)
        const contactItems: string[] = [];
        if (mobile) contactItems.push(`<span style="color: #333333;"><strong style="color: #111111;">M:</strong>&nbsp;${mobile}</span>`);
        if (office) contactItems.push(`<span style="color: #333333;"><strong style="color: #111111;">O:</strong>&nbsp;${office}</span>`);
        
        if (contactItems.length > 0) {
            signatureHtml += `<p style="margin: 0 0 5px 0; font-size: 9pt;">${contactItems.join('<span style="color: #cccccc; margin: 0 5px;">|</span>')}</p>`;
        }
        
        // Links (Social Media)
        const linkItems: string[] = [];
        if (linkedin) linkItems.push(`<a href="${linkedin}" target="_blank" style="color: #1a0dab; text-decoration: none; font-size: 9pt;">LinkedIn</a>`);
        if (twitter) linkItems.push(`<a href="${twitter}" target="_blank" style="color: #1a0dab; text-decoration: none; font-size: 9pt;">Twitter</a>`);
        if (instagram) linkItems.push(`<a href="${instagram}" target="_blank" style="color: #1a0dab; text-decoration: none; font-size: 9pt;">Instagram</a>`);

        if (linkItems.length > 0) {
            signatureHtml += `<p style="margin: 5px 0 0 0; font-size: 9pt;">${linkItems.join('<span style="color: #cccccc; margin: 0 5px;">|</span>')}</p>`;
        }
        
        signatureHtml += `
      </td>
    </tr>`;

        signatureHtml += `
  </table>
</div>`;
        // --- End Signature HTML Construction ---

        // Update the live preview area with the generated HTML
        if (signaturePreview) signaturePreview.innerHTML = signatureHtml;
        // Put the raw HTML into the textarea for copying
        if (htmlOutput) htmlOutput.value = signatureHtml.trim(); 
    }

    /**
     * Function to copy the generated HTML from the textarea to the clipboard.
     */
    function copyHtmlToClipboard(): void {
        if (!htmlOutput || !htmlOutput.value) {
            alert('Nothing to copy yet! Please generate a signature first.');
            return;
        }
        htmlOutput.select(); // Select the text
        htmlOutput.setSelectionRange(0, 99999); // For mobile devices

        try {
            // Modern asynchronous clipboard API
            navigator.clipboard.writeText(htmlOutput.value)
                .then(() => {
                    alert('HTML Signature copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy with navigator.clipboard: ', err);
                    // Fallback for browsers that might not support it or if permission is denied
                    legacyCopy();
                });
        } catch (err) {
            console.error('navigator.clipboard API not available: ', err);
            // Fallback for older browsers
            legacyCopy();
        }
    }
    
    /**
     * Legacy copy command for older browsers or when navigator.clipboard fails.
     */
    function legacyCopy(): void {
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert('HTML Signature copied to clipboard (using fallback method)!');
            } else {
                alert('Copying failed. Please try to copy manually from the text box.');
                console.error('Fallback copy command failed.');
            }
        } catch (err) {
            alert('Copying failed. Please try to copy manually from the text box.');
            console.error('Error during fallback copy command: ', err);
        }
    }
    
    // Perform an initial generation on page load if you want to pre-populate or show a blank state.
    // For a cleaner start, we can call it to ensure the preview area is initialized.
    generateSignature(); 
});
    // Get references to all relevant DOM elements
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');

    const nameInput = document.getElementById('name');
    const titleInput = document.getElementById('title');
    const taglineInput = document.getElementById('tagline');
    const companyNameInput = document.getElementById('companyName');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const websiteInput = document.getElementById('website');
    const logoUrlInput = document.getElementById('logoUrl');
    const linkedinInput = document.getElementById('linkedin');
    const twitterInput = document.getElementById('twitter');
    const instagramInput = document.getElementById('instagram');
    const valuesStatementInput = document.getElementById('valuesStatement');

    const signaturePreview = document.getElementById('signaturePreview');
    const htmlOutput = document.getElementById('htmlOutput');

    // Event listener for the generate button
    generateBtn.addEventListener('click', generateSignature);
    // Event listener for the copy button
    copyBtn.addEventListener('click', copyHtmlToClipboard);

    // Automatically update preview as user types in any input field
    const allInputs = document.querySelectorAll('.form-container input');
    allInputs.forEach(input => {
        input.addEventListener('input', generateSignature); // Live update
    });

    /**
     * Main function to generate the email signature HTML.
     * It gathers data from input fields and constructs the HTML string.
     */
    function generateSignature() {
        // Retrieve and trim values from input fields
        const name = nameInput.value.trim();
        const title = titleInput.value.trim();
        const tagline = taglineInput.value.trim();
        const companyName = companyNameInput.value.trim();
        const phone = phoneInput.value.trim();
        const email = emailInput.value.trim();
        const website = websiteInput.value.trim();
        const logoUrl = logoUrlInput.value.trim();
        const linkedin = linkedinInput.value.trim();
        const twitter = twitterInput.value.trim();
        const instagram = instagramInput.value.trim();
        const valuesStatement = valuesStatementInput.value.trim();

        // --- Start Signature HTML Construction ---
        // This HTML is designed for maximum email client compatibility.
        // It uses tables for layout and inline CSS styles.
        let signatureHtml = `
<div style="font-family: Arial, Helvetica, sans-serif; font-size: 10pt; color: #333333; line-height: 1.4;">
  <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: auto;">
    <tr>`;

        // Add logo if URL is provided
        if (logoUrl) {
            signatureHtml += `
      <td style="padding-right: 15px; vertical-align: top; width: 80px;">
        <img src="${logoUrl}" alt="${name || 'Logo'}" style="width: 75px; height: auto; border: 0; display: block; max-width: 75px;">
      </td>`;
        }

        signatureHtml += `
      <td style="vertical-align: top;">`;

        // Add name
        if (name) {
            signatureHtml += `<p style="margin: 0 0 2px 0; font-size: 12pt; font-weight: bold; color: #222222;">${name}</p>`;
        }
        // Add title
        if (title) {
            signatureHtml += `<p style="margin: 0 0 5px 0; font-size: 10pt; color: #555555;">${title}</p>`;
        }
        // Add tagline
        if (tagline) {
            signatureHtml += `<p style="margin: 0 0 8px 0; font-size: 9pt; font-style: italic; color: #444444;">${tagline}</p>`;
        }
        // Add company name
        if (companyName) {
            signatureHtml += `<p style="margin: 0 0 5px 0; font-size: 10pt; color: #555555; font-weight: bold;">${companyName}</p>`;
        }


        // Contact Information (Phone, Email)
        let contactItems = [];
        if (phone) contactItems.push(`<span style="color: #333333;"><strong style="color: #111111;">P:</strong>&nbsp;${phone}</span>`);
        if (email) contactItems.push(`<span style="color: #333333;"><strong style="color: #111111;">E:</strong>&nbsp;<a href="mailto:${email}" style="color: #1a0dab; text-decoration: none;">${email}</a></span>`);
        
        if (contactItems.length > 0) {
            signatureHtml += `<p style="margin: 0 0 5px 0; font-size: 9pt;">${contactItems.join('<span style="color: #cccccc; margin: 0 5px;">|</span>')}</p>`;
        }
        
        // Links (Website, Social Media)
        let linkItems = [];
        if (website) linkItems.push(`<a href="${website}" target="_blank" style="color: #1a0dab; text-decoration: none; font-size: 9pt;">Website</a>`);
        if (linkedin) linkItems.push(`<a href="${linkedin}" target="_blank" style="color: #1a0dab; text-decoration: none; font-size: 9pt;">LinkedIn</a>`);
        if (twitter) linkItems.push(`<a href="${twitter}" target="_blank" style="color: #1a0dab; text-decoration: none; font-size: 9pt;">Twitter</a>`);
        if (instagram) linkItems.push(`<a href="${instagram}" target="_blank" style="color: #1a0dab; text-decoration: none; font-size: 9pt;">Instagram</a>`);

        if (linkItems.length > 0) {
            signatureHtml += `<p style="margin: 5px 0 0 0; font-size: 9pt;">${linkItems.join('<span style="color: #cccccc; margin: 0 5px;">|</span>')}</p>`;
        }
        
        signatureHtml += `
      </td>
    </tr>`;

        // Add values statement if provided, spanning both columns
        if (valuesStatement) {
             signatureHtml += `
    <tr>
      <td colspan="2" style="padding-top: 10px; border-top: 0.5px solid #eeeeee; margin-top: 10px;">
        <p style="margin: 0; font-size: 8pt; color: #777777; font-style: italic;">${valuesStatement}</p>
      </td>
    </tr>`;
        }

        signatureHtml += `
  </table>
</div>`;
        // --- End Signature HTML Construction ---

        // Update the live preview area with the generated HTML
        signaturePreview.innerHTML = signatureHtml;
        // Put the raw HTML into the textarea for copying
        htmlOutput.value = signatureHtml.trim(); 
    }

    /**
     * Function to copy the generated HTML from the textarea to the clipboard.
     */
    function copyHtmlToClipboard() {
        if (!htmlOutput.value) {
            alert('Nothing to copy yet! Please generate a signature first.');
            return;
        }
        htmlOutput.select(); // Select the text
        htmlOutput.setSelectionRange(0, 99999); // For mobile devices

        try {
            // Modern asynchronous clipboard API
            navigator.clipboard.writeText(htmlOutput.value)
                .then(() => {
                    alert('HTML Signature copied to clipboard!');
                })
                .catch(err => {
                    console.error('Failed to copy with navigator.clipboard: ', err);
                    // Fallback for browsers that might not support it or if permission is denied
                    legacyCopy();
                });
        } catch (err) {
            console.error('navigator.clipboard API not available: ', err);
            // Fallback for older browsers
            legacyCopy();
        }
    }
    
    /**
     * Legacy copy command for older browsers or when navigator.clipboard fails.
     */
    function legacyCopy() {
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert('HTML Signature copied to clipboard (using fallback method)!');
            } else {
                alert('Copying failed. Please try to copy manually from the text box.');
                console.error('Fallback copy command failed.');
            }
        } catch (err) {
            alert('Copying failed. Please try to copy manually from the text box.');
            console.error('Error during fallback copy command: ', err);
        }
    }
    
    // Perform an initial generation on page load if you want to pre-populate or show a blank state.
    // For a cleaner start, we can call it to ensure the preview area is initialized.
    generateSignature(); 
});
