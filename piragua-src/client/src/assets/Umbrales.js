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
      return "Baja";
    } else if (lluvia <= 160) {
      return "Moderada";
    } else if (lluvia <= 400) {
      return "Alta";
    } else {
      return "Extrema";
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
  // if (temp > -100 && temp < 7) {
  //   return "Muy fría";
  // } else
  if (temp >= -100 && temp < 13) {
    return "Fría";
  } else if (temp >= 13 && temp < 18) {
    return "Fresca";
  } else if (temp >= 18 && temp < 24) {
    return "Templada";
  } else if (temp >= 24 && temp < 29) {
    return "Calida";
  } else if (temp >= 29 && temp <= 60) {
    return "Muy calida";
  } else {
    return "Sin datos";
  }
};

const evaluateDirViento = (dir, timeWindow) => {
  if (dir >= 0 && dir <= 20) {
    return "Norte";
  } else if (dir > 20 && dir < 70) {
    return "Nor Este";
  } else if (dir >= 70 && dir <= 110) {
    return "Este";
  } else if (dir > 110 && dir < 160) {
    return "Sur Este";
  } else if (dir >= 160 && dir <= 200) {
    return "Sur";
  } else if (dir > 200 && dir < 250) {
    return "Sur Oeste";
  } else if (dir >= 250 && dir <= 290) {
    return "Oeste";
  } else if (dir > 290 && dir < 340) {
    return "Nor Oeste";
  } else if (dir >= 340 && dir <= 360) {
    return "Norte";
  } else {
    return "Sin datos";
  }
};

export const evaluateVariableAutomatic = {
  Lluvia: evaluateLluvia,
  Nivel: evaluateNivel,
  Temp: evaluateTemp,
  "Dir viento": evaluateDirViento,
};
