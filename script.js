// JavaScript for Interactivity
document.getElementById('generate-prompt').addEventListener('click', function () {
  const angleView = document.getElementById('angle-view').value;
  const race = document.getElementById('race').value;
  const nationality = document.getElementById('nationality').value;
  const describeYourself = document.getElementById('describe-yourself').value;

  // Combine selections into a prompt
  const prompt = `Angle View: ${angleView}, Race: ${race}, Nationality: ${nationality}, Description: ${describeYourself}`;
  document.getElementById('result-prompt').value = prompt;

  // Update WhatsApp share link
  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(prompt)}`;
  document.getElementById('share-whatsapp').href = whatsappLink;
});

// Copy to Clipboard
document.getElementById('copy-prompt').addEventListener('click', function () {
  const prompt = document.getElementById('result-prompt').value;
  navigator.clipboard.writeText(prompt).then(() => {
    alert('Prompt copied to clipboard!');
  });
});
