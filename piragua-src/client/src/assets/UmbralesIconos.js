const evaluateLluvia = (lluvia, timeWindow) => {
  if (timeWindow === "24h") {
    if (lluvia <= 0) {
      return 1;
    } else if (lluvia <= 25) {
      return 2;
    } else if (lluvia <= 50) {
      return 3;
    } else if (lluvia <= 100) {
      return 4;
    } else {
      return 5;
    }
  }

  if (timeWindow === "72h") {
    if (lluvia <= 0) {
      return 1;
    } else if (lluvia <= 10) {
      return 2;
    } else if (lluvia <= 40) {
      return 3;
    } else if (lluvia <= 100) {
      return 4;
    } else {
      return 5;
    }
  }

  if (timeWindow === "7d") {
    if (lluvia <= 0) {
      return 1;
    } else if (lluvia <= 20) {
      return 2;
    } else if (lluvia <= 80) {
      return 3;
    } else if (lluvia <= 200) {
      return 4;
    } else {
      return 5;
    }
  }

  if (timeWindow === "30d") {
    if (lluvia <= 0) {
      return 1;
    } else if (lluvia <= 40) {
      return 2;
    } else if (lluvia <= 160) {
      return 3;
    } else if (lluvia <= 400) {
      return 4;
    } else {
      return 5;
    }
  }
};

const evaluateNivel = (nivel, timeWindow) => {
  if (timeWindow === "24h") {
    if (nivel <= 0) {
      return 7;
    } else if (nivel <= 999) {
      return 10;
    } else if (nivel <= 50) {
      return 11;
    } else if (nivel <= 100) {
      return 12;
    } else {
      return 13;
    }
  }

  if (timeWindow === "72h") {
    if (nivel <= 0) {
      return 7;
    } else if (nivel <= 999) {
      return 10;
    } else if (nivel <= 40) {
      return 11;
    } else if (nivel <= 100) {
      return 12;
    } else {
      return 13;
    }
  }

  if (timeWindow === "7d") {
    if (nivel <= 0) {
      return 7;
    } else if (nivel <= 999) {
      return 10;
    } else if (nivel <= 80) {
      return 11;
    } else if (nivel <= 200) {
      return 12;
    } else {
      return 13;
    }
  }

  if (timeWindow === "30d") {
    if (nivel <= 0) {
      return 7;
    } else if (nivel <= 999) {
      return 10;
    } else if (nivel <= 160) {
      return 11;
    } else if (nivel <= 400) {
      return 12;
    } else {
      return 13;
    }
  }
};

const evaluateTemp = (temp, timeWindow) => {
  if (timeWindow === "24h") {
    if (temp <= 999) {
      return 51;
    }
  }

  if (timeWindow === "72h") {
    if (temp <= 999) {
      return 51;
    }
  }

  if (timeWindow === "7d") {
    if (temp <= 999) {
      return 51;
    }
  }

  if (timeWindow === "30d") {
    if (temp <= 999) {
      return 51;
    }
  }
};

export const evaluateVariableAutomaticIcon = {
  Lluvia: evaluateLluvia,
  Nivel: evaluateNivel,
  Temp: evaluateTemp,
};
