export default class RecipeHelper {
  static formatPrepTime(prepTime) {
    const minutes = parseFloat(prepTime.replace('PT', ''));
    return calculatePrepTime(minutes);
  }

  static getServingsize(yieldType, yields) {
    if (!yieldType && !yields) return '';

    const servings = (yields.length > 1) ? formatMultipleYields(yields, 'yields') : yields[0].yields;
    return `Yield: ${servings} ${yieldType}`;
  }

  static getUtensilById(id, utensils) {
    if (!id || !utensils) return '';

    return utensils.filter(utensil => utensil.id === id)[0];
  }

  static getIngredientMeasurements(ingredient, yields) {
    if (!yields) return '';

    const serving = yields[0].ingredients.filter(item => item.id === ingredient.id)[0];
    let info;

    if (serving.amount && serving.unit) {
      info = `${serving.amount} ${serving.unit}`;
    } else {
      info = 'N/A';
    }

    return `Measurement: ${info}`;
  }
}

function calculatePrepTime(minutes) {
  let timer;
  if (minutes > 60) {
    timer = (minutes / 60);
    timer += timer > 1 ? ' hours' : ' hours';
  } else {
    timer = minutes + ' min';
  }
  return timer;
}

function formatMultipleYields(yields, fieldName) {
  return yields.reduce((acc, item, index) => {
    let orSeperator = index !== yields.length-1 ? ' or' : '';
    return acc.concat(' ', item[fieldName], orSeperator);
  }, '');
}
