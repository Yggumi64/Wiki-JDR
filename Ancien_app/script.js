// Parseur CSV sécurisé (gestion des guillemets et sauts de ligne)
function parseCSV(text) {
    const lines = [];
    let row = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const nextChar = text[i + 1];

        if (char === '"') {
            if (inQuotes && nextChar === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            row.push(current.trim());
            current = '';
        } else if ((char === '\r' || char === '\n') && !inQuotes) {
            if (char === '\r' && nextChar === '\n') i++;
            row.push(current.trim());
            if (row.length > 1 || row[0] !== '') lines.push(row);
            row = [];
            current = '';
        } else {
            current += char;
        }
    }
    if (current || row.length > 0) {
        row.push(current.trim());
        lines.push(row);
    }

    const headers = lines[0];
    return lines.slice(1).map(line => {
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = line[index] || '';
        });
        return obj;
    });
}

// 1. Rendu du bloc Histoire (JSON)
function renderHistory(data) {
    document.getElementById('faction-title').textContent = data.title;

    const badgeColor = document.getElementById('badge-color');
    badgeColor.textContent = data.colorBadge;
    badgeColor.className = `faction-badge ${data.colorClass}`;

    document.getElementById('badge-valeur').textContent = data.valeurBadge;

    let html = `<p>${data.presentation}</p>`;

    data.sections.forEach(sec => {
        html += `<div class="faction-section"><h2>${sec.title}</h2>`;
        if (sec.type === 'list') {
            html += '<ul>';
            sec.items.forEach(item => {
                html += `<li>${item}</li>`;
            });
            html += '</ul>';
        } else if (sec.type === 'text') {
            html += sec.content;
        }
        html += '</div>';
    });

    if (data.classTreeImage) {
        html += `
            <div class="faction-section">
                <h2>Arbre de classes</h2>
                <img src="${data.classTreeImage}" alt="Arbre de classes" class="class-tree-img">
            </div>
        `;
    }

    document.getElementById('faction-history-content').innerHTML = html;
}

// 2. Rendu du bloc Classes (CSV)
function renderClasses(classes) {
    const container = document.getElementById('faction-classes-content');
    container.innerHTML = '';

    classes.forEach(item => {
        const details = document.createElement('details');
        details.className = 'class-item';

        const pathHTML = item.path ? `<div class="class-desc"><i>${item.path}</i></div>` : '';

        details.innerHTML = `
            <summary>${item.nom} (${item.tier})</summary>
            ${pathHTML}
            <div class="class-desc">${item.description}</div>
        `;

        container.appendChild(details);
    });
}

// 3. Fonction principale qui charge simultanément le JSON et le CSV de la faction
async function switchFaction(factionName) {
    try {
        const [jsonResponse, csvResponse] = await Promise.all([
            fetch(`/data/${factionName}.json`),
            fetch(`/data/${factionName}.csv`)
        ]);

        if (!jsonResponse.ok || !csvResponse.ok) {
            throw new Error(`Fichiers introuvables pour la faction "${factionName}".`);
        }

        const jsonData = await jsonResponse.json();
        const csvText = await csvResponse.text();
        const csvData = parseCSV(csvText);

        renderHistory(jsonData);
        renderClasses(csvData);

    } catch (error) {
        console.error("Erreur lors du chargement de la faction :", error);
    }
}

// Chargement initial
document.addEventListener('DOMContentLoaded', () => {
    switchFaction('gardiens');
});