function computeWaterUnits(heights) {
  let n = heights.length;
  let leftMax = new Array(n).fill(0);
  let rightMax = new Array(n).fill(0);
  let totalWaterUnits = 0;

  // Calculate the maximum heights to the left of each index
  leftMax[0] = heights[0];
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
  }

  // Calculate the maximum heights to the right of each index
  rightMax[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
  }

  // Calculate the water units at each index and add to the total
  for (let i = 0; i < n; i++) {
    totalWaterUnits += Math.min(leftMax[i], rightMax[i]) - heights[i];
  }

  return totalWaterUnits;
}

function generateInputTable(heights) {
  const container = document.getElementById("input-container");
  let tableHTML = "<h3>Input</h3><table>";
  for (let i = 0; i < heights.length; i++) {
    tableHTML += "<tr>";
    for (let height of heights) {
      tableHTML += `<td class="block">${height}</td>`;
    }
    tableHTML += "</tr>";
  }
  tableHTML += "</table>";
  container.innerHTML = tableHTML;
}

function generateOutputTable(heights, totalUnits) {
  const container = document.getElementById("output-container");
  const waterHeight = Math.max(...heights);

  let tableHTML = "<h3>Output</h3><table>";
  for (let i = 0; i < waterHeight; i++) {
    tableHTML += "<tr>";
    for (let height of heights) {
      const isBlockCell = i < waterHeight - height;
      const isWaterCell = i >= waterHeight - height && i < waterHeight;
      tableHTML += `<td class="${
        isBlockCell ? "block" : isWaterCell ? "water" : ""
      }"></td>`;
    }
    tableHTML += "</tr>";
  }
  tableHTML += "</table>";
  tableHTML += `<p>Total Units of Water Stored: ${totalUnits}</p>`;
  container.innerHTML = tableHTML;
}

function calculateWaterUnits() {
  // Example input
  const input = [0, 4, 0, 0, 0, 6, 0, 6, 4, 0];
  const totalUnits = computeWaterUnits(input);

  generateInputTable(input);
  generateOutputTable(input, totalUnits);
}
