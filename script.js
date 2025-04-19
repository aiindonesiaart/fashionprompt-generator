document.addEventListener('DOMContentLoaded', function() {
    // Collapsible sections
    const collapsibles = document.querySelectorAll('.collapsible');
    collapsibles.forEach(collapsible => {
        const header = collapsible.querySelector('.collapsible-header');
        header.addEventListener('click', () => {
            collapsible.classList.toggle('active');
        });
    });

    // Show ethnic group dropdown only if Indonesian is selected
    const nationalitySelect = document.getElementById('nationality');
    const ethnicGroup = document.getElementById('ethnicGroup');
    
    nationalitySelect.addEventListener('change', function() {
        if (this.value === 'Indonesian') {
            ethnicGroup.style.display = 'block';
        } else {
            ethnicGroup.style.display = 'none';
        }
        generatePrompt();
    });

    // Generate prompt when any input changes
    const formInputs = document.querySelectorAll('select, input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('change', generatePrompt);
    });
    document.getElementById('describeSubject').addEventListener('input', generatePrompt);

    // Copy button functionality
    const copyBtn = document.getElementById('copyBtn');
    copyBtn.addEventListener('click', function() {
        const promptText = document.getElementById('promptOutput').textContent;
        navigator.clipboard.writeText(promptText).then(() => {
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
        });
    });

    // Share via WhatsApp button
    const shareBtn = document.getElementById('shareBtn');
    shareBtn.addEventListener('click', function() {
        const promptText = document.getElementById('promptOutput').textContent;
        const encodedText = encodeURIComponent(promptText);
        window.open(`https://wa.me/?text=${encodedText}`, '_blank');
    });

    // Initial prompt generation
    generatePrompt();

    // Function to generate the fashion prompt
    function generatePrompt() {
        const angleView = document.getElementById('angleView').value;
        const race = document.getElementById('race').value;
        const nationality = document.getElementById('nationality').value;
        const ethnic = document.getElementById('ethnic').value;
        const hairStyle = document.getElementById('hairStyle').value;
        const skinTone = document.getElementById('skinTone').value;
        const age = document.getElementById('age').value;
        const personality = document.getElementById('personality').value;
        const bodyType = document.getElementById('bodyType').value;
        const person = document.getElementById('person').value;
        const describeSubject = document.getElementById('describeSubject').value;
        
        const propColor1 = document.getElementById('propColor1').value;
        const prop1 = document.getElementById('prop1').value;
        const propColor2 = document.getElementById('propColor2').value;
        const prop2 = document.getElementById('prop2').value;
        const propColor3 = document.getElementById('propColor3').value;
        const prop3 = document.getElementById('prop3').value;
        const propColor4 = document.getElementById('propColor4').value;
        const prop4 = document.getElementById('prop4').value;
        
        const customColor = document.getElementById('customColor').value;
        const customProperty = document.getElementById('customProperty').value;

        // Build the prompt
        let prompt = `${angleView} of `;
        
        if (age) prompt += `a ${age} `;
        if (personality) prompt += `${personality.toLowerCase()} `;
        
        // Add nationality/ethnic details
        if (nationality === 'Indonesian' && ethnic) {
            prompt += `${nationality} ${ethnic} `;
        } else if (race && nationality) {
            prompt += `${race} ${nationality} `;
        } else if (race) {
            prompt += `${race} `;
        } else if (nationality) {
            prompt += `${nationality} `;
        }
        
        prompt += `${person} with ${hairStyle.toLowerCase()} ${hairStyle.includes('cut') ? '' : ''}, ${skinTone.toLowerCase()} , `;
        if (bodyType) prompt += `${bodyType.toLowerCase()} body type, `;
        
        // Add clothing items
        let clothingItems = [];
        if (prop1 && propColor1) clothingItems.push(`a ${propColor1.toLowerCase()} ${prop1.toLowerCase()}`);
        if (prop2 && propColor2) clothingItems.push(`a ${propColor2.toLowerCase()} ${prop2.toLowerCase()}`);
        if (prop3 && propColor3) clothingItems.push(`${propColor3.toLowerCase()} ${prop3.toLowerCase()}`);
        if (prop4 && propColor4) clothingItems.push(`${propColor4.toLowerCase()} ${prop4.toLowerCase()}`);
        
        if (clothingItems.length > 0) {
            prompt += `wearing ${joinWithAnd(clothingItems)}. `;
        }
        
        // Add custom properties
        if (customColor && customProperty) {
            prompt += `The look is completed with ${customColor.toLowerCase()} ${customProperty.toLowerCase()}.`;
        } else if (customProperty) {
            prompt += `The look is completed with ${customProperty.toLowerCase()}.`;
        }
        
        // Add user description
        if (describeSubject) {
            prompt += ` ${describeSubject}`;
        }
        
        // Update the prompt output
        document.getElementById('promptOutput').textContent = prompt;
    }

    // Helper function to join array items with commas and "and"
    function joinWithAnd(arr) {
        if (arr.length === 1) return arr[0];
        if (arr.length === 2) return arr.join(' and ');
        return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];
    }
});
