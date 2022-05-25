const evaluateLluvia = (lluvia, timeWindow) => {
  if (timeWindow === "24h") {
    if (lluvia <= 0) {
      return "Sin lluvia";
    } else if (lluvia <= 25) {
      return "Baja";
    } else if (lluvia <= 50) {
      return "Moderada";
    } else if (lluvia <= 100) {
      return "Alta";
    } else {
      return "Extrema";
    }
  }

  if (timeWindow === "72h") {
    if (lluvia <= 0) {
      return "Sin lluvia";
    } else if (lluvia <= 10) {
      return "Baja";
    } else if (lluvia <= 40) {
      return "Moderada";
    } else if (lluvia <= 100) {
      return "Alta";
    } else {
      return "Extrema";
    }
  }

  if (timeWindow === "7d") {
    if (lluvia <= 0) {
      return "Sin lluvia";
    } else if (lluvia <= 20) {
      return "Baja";
    } else if (lluvia <= 80) {
      return "Moderada";
    } else if (lluvia <= 200) {
      return "Alta";
    } else {
      return "Extrema";
    }
  }

  if (timeWindow === "30d") {
    if (lluvia <= 0) {
      return "Sin lluvia";
    } else if (lluvia <= 40) {
      return "Lluvia baja";
    } else if (lluvia <= 160) {
      return "Lluvia moderada";
    } else if (lluvia <= 400) {
      return "Lluvia alta";
    } else {
      return "Lluvia extrema";
    }
  }
};

const evaluateNivel = (nivel, timeWindow) => {
  if (timeWindow === "24h") {
    if (nivel <= 0) {
      return "Sin datos";
    } else if (nivel <= 999) {
      return "Seguro";
    } else if (nivel <= 50) {
      return "Precaución";
    } else if (nivel <= 100) {
      return "Inundación menor";
    } else {
      return "Inundación mayor";
    }
  }

  if (timeWindow === "72h") {
    if (nivel <= 0) {
      return "Sin datos";
    } else if (nivel <= 999) {
      return "Seguro";
    } else if (nivel <= 40) {
      return "Precaución";
    } else if (nivel <= 100) {
      return "Inundación menor";
    } else {
      return "Inundación mayor";
    }
  }

  if (timeWindow === "7d") {
    if (nivel <= 0) {
      return "Sin datos";
    } else if (nivel <= 999) {
      return "Seguro";
    } else if (nivel <= 80) {
      return "Precaución";
    } else if (nivel <= 200) {
      return "Inundación menor";
    } else {
      return "Inundación mayor";
    }
  }

  if (timeWindow === "30d") {
    if (nivel <= 0) {
      return "Sin datos";
    } else if (nivel <= 999) {
      return "Seguro";
    } else if (nivel <= 160) {
      return "Precaución";
    } else if (nivel <= 400) {
      return "Inundación menor";
    } else {
      return "Inundación mayor";
    }
  }
};

const evaluateTemp = (temp, timeWindow) => {
  if (timeWindow === "24h") {
    if (temp <= 999) {
      return "Media";
    }
  }

  if (timeWindow === "72h") {
    if (temp <= 999) {
      return "Media";
    }
  }

  if (timeWindow === "7d") {
    if (temp <= 999) {
      return "Media";
    }
  }

  if (timeWindow === "30d") {
    if (temp <= 999) {
      return "Media";
    }
  }
};

export const evaluateVariableAutomatic = {
  Lluvia: evaluateLluvia,
  Nivel: evaluateNivel,
  Temp: evaluateTemp,
};
