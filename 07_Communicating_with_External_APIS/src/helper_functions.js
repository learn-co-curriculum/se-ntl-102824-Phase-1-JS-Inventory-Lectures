// Create and return a button element with the contents 'Click Me!'
// createElement('button', {
//   textContent: 'Click Me!',
//   onClick: () => console.log('thanks')
// })

function createElement(tagName, properties) {
  const el = document.createElement(tagName);
  assignElementProperties(el, properties);
  return el;
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
function assignElementProperties(element, properties) {
  for (const [property, value] of Object.entries(properties)) {
    assignPropertyValue(element, property, value);
  }
}

function assignPropertyValue(element, property, value) {
  if (isEventListener(property)) {
    element.addEventListener(extractEventType(property), value)
    return;
  } 
  element[property] = value;
}

function isEventListener(property) {
  return property.slice(0, 2) === 'on';
}

function extractEventType(property) {
  return property.slice(2).toLowerCase();
}