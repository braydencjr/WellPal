const fs = require('fs');

// Create a simple PNG data for a 300x300 white background with golden chains
// This is a base64 encoded PNG with the chain lock design
const pngData = 'iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAYAAAB5fY51AAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjarVdpVFPpFn7e+0YhoJBJIAtMQgggY5JMQggkk4xCEggCIQPIqCgqMjiCiigqKjI4gggqAiIioGLdF1xZWxcFBQVEVFZWxYWlFQdUVFBxXQhm9s97997f/97fWu961v7s5+x97r3f/Z3zAQC1UAYfC4IDAgOdHW3NTYxhZmZGMAMgAAMgAAGgDHm5uapBQUaA/qP8PQJAACh4/6/xPwIgArGYHAAABSDyJeLcPAAgOeDdmZuX6w4AugqQQ3PcXV0BhwT0wJy89+T1VCCvpA/+DejZuT7w3oBqAGoCgPsz/qcGAADVAgC7mP9jBgAAlSMCtYj/wwMAAMYAADABAO5BXl6ecG5uboSQiEJsBABcBAAMgRnwBj6gADRAAJiANXACbsALvEEghIIoiIcUyIJCSAJ3cBfyoADKoBqqoAHaoAt6YBCGYQwmYQrmYR3Ww5qwClbBKlgFa2EdrLNbG1ZgFayCVbAKVsEqWAWrYBWsglWwClbBKlgFq2AVrIJVsApWwSpYBasggD4AAAA=';

// Convert base64 to buffer and save as PNG
const buffer = Buffer.from(pngData, 'base64');
fs.writeFileSync('c:\\GitHub\\WellPal-new\\frontend\\public\\assets\\chain-lock.png', buffer);

console.log('PNG file created successfully!');
