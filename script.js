let transactions = [];

const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("list");

const ctx = document.getElementById("chart");

let chart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Food", "Transport", "Fun"],
    datasets: [{
      data: [0,0,0],
      backgroundColor: ["#22c55e", "#3b82f6", "#f97316"]
    }]
  },
  options: {
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

function addTransaction() {
  const name = document.getElementById("name").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const category = document.getElementById("category").value;

  if (!name || !amount) return alert("Isi semua field");

  transactions.push({
    id: Date.now(),
    name,
    amount,
    category
  });

  updateUI();
}

function updateUI() {
  renderTransactions();
  updateBalance();
  updateChart();
}

function renderTransactions() {
  listEl.innerHTML = "";

  transactions.forEach(t => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="card-item">
        <div class="left">
          <div class="name">${t.name}</div>
          <div class="category">${t.category}</div>
        </div>
        <div class="right">
          <div class="amount">$${t.amount.toFixed(2)}</div>
          <button class="delete" onclick="deleteTx(${t.id})">✕</button>
        </div>
      </div>
    `;

    listEl.appendChild(li);
  });
}

function updateBalance() {
  let total = 0;
  transactions.forEach(t => total += t.amount);
  balanceEl.innerText = "$" + total.toFixed(2);
}

function updateChart() {
  let totals = { Food: 0, Transport: 0, Fun: 0 };

  transactions.forEach(t => {
    totals[t.category] += t.amount;
  });

  chart.data.datasets[0].data = [
    totals.Food,
    totals.Transport,
    totals.Fun
  ];

  chart.update();
}

function deleteTx(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateUI();
}

// init
updateUI();