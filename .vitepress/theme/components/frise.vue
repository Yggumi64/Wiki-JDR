<template>
  <div class="timeline main-timeline">
    <div 
      v-for="(era, mainIndex) in events" 
      :key="mainIndex" 
      class="timeline-item main-item"
    >
      <!-- Point sur la ligne principale -->
      <div class="timeline-marker main-marker"></div>
      
      <!-- Bloc principal (Ère / Événement Majeur) -->
      <div class="timeline-content main-content">
        <div class="timeline-header" @click="toggleMain(mainIndex)">
          <span class="timeline-date main-date">{{ era.date }}</span>
          <h3 class="timeline-title main-title">{{ era.title }}</h3>
          <span class="sub-count" v-if="era.subEvents && era.subEvents.length">
            ({{ era.subEvents.length }} événements)
          </span>
          <span class="timeline-icon">{{ openMainIndexes.includes(mainIndex) ? '▲' : '▼' }}</span>
        </div>
        
        <!-- Description optionnelle de l'Ère -->
        <div v-if="era.description && openMainIndexes.includes(mainIndex)" class="era-description">
          <p>{{ era.description }}</p>
        </div>

        <!-- Sous-frise juxtaposée (Second niveau) -->
        <div 
          v-if="era.subEvents && era.subEvents.length && openMainIndexes.includes(mainIndex)" 
          class="timeline sub-timeline"
        >
          <div 
            v-for="(sub, subIndex) in era.subEvents" 
            :key="subIndex" 
            class="timeline-item sub-item"
          >
            <!-- Point sur la ligne secondaire -->
            <div class="timeline-marker sub-marker"></div>

            <div class="timeline-content sub-content">
              <div 
                class="timeline-header sub-header" 
                @click="toggleSub(mainIndex, subIndex)"
              >
                <span class="timeline-date sub-date">{{ sub.date }}</span>
                <h4 class="timeline-title sub-title">{{ sub.title }}</h4>
                <span v-if="sub.description" class="timeline-icon">
                  {{ isSubOpen(mainIndex, subIndex) ? '▲' : '▼' }}
                </span>
              </div>

              <!-- Description de l'événement secondaire -->
              <div 
                v-if="sub.description" 
                v-show="isSubOpen(mainIndex, subIndex)" 
                class="timeline-body sub-body"
              >
                <p>{{ sub.description }}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  events: {
    type: Array,
    required: true
  }
})

// Index des Ères ouvertes
const openMainIndexes = ref([])

// Clés des sous-événements ouverts sous la forme "mainIndex-subIndex"
const openSubKeys = ref([])

function toggleMain(index) {
  if (openMainIndexes.value.includes(index)) {
    openMainIndexes.value = openMainIndexes.value.filter(i => i !== index)
  } else {
    openMainIndexes.value.push(index)
  }
}

function toggleSub(mainIndex, subIndex) {
  const key = `${mainIndex}-${subIndex}`
  if (openSubKeys.value.includes(key)) {
    openSubKeys.value = openSubKeys.value.filter(k => k !== key)
  } else {
    openSubKeys.value.push(key)
  }
}

function isSubOpen(mainIndex, subIndex) {
  return openSubKeys.value.includes(`${mainIndex}-${subIndex}`)
}
</script>

<style scoped>
/* Base de la ligne verticale */
.timeline {
  position: relative;
  margin: 20px 0;
}

/* Ligne principale (Niveau 1) */
.main-timeline {
  padding-left: 25px;
  border-left: 3px solid var(--vp-c-brand-1);
}

.timeline-item {
  position: relative;
  margin-bottom: 25px;
}

.timeline-item:last-child {
  margin-bottom: 0;
}

/* Marqueurs (Points) */
.timeline-marker {
  position: absolute;
  border-radius: 50%;
  border: 3px solid var(--vp-c-bg);
}

.main-marker {
  left: -33px;
  top: 14px;
  width: 14px;
  height: 14px;
  background-color: var(--vp-c-brand-1);
}

/* En-têtes et conteneurs */
.timeline-content {
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-default-soft);
  border-radius: 8px;
  padding: 12px 16px;
}

.main-content {
  border-left: 4px solid var(--vp-c-brand-1);
}

.timeline-header {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  user-select: none;
}

.timeline-date {
  font-weight: bold;
  white-space: nowrap;
}

.main-date {
  color: var(--vp-c-brand-1);
  font-size: 1.05em;
}

.timeline-title {
  margin: 0 !important;
  flex-grow: 1;
  border: none !important;
  padding: 0 !important;
}

.main-title {
  font-size: 1.1em;
  font-weight: 600;
}

.sub-count {
  font-size: 0.85em;
  opacity: 0.6;
}

.timeline-icon {
  font-size: 0.75em;
  opacity: 0.7;
}

.era-description {
  margin-top: 10px;
  padding-top: 8px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 0.95em;
}

/* ---------------------------------------------------- */
/* NIVEAU 2 : SOUS-FRISE JUXTAPOSÉE                     */
/* ---------------------------------------------------- */

.sub-timeline {
  margin-top: 15px;
  margin-left: 10px;
  padding-left: 20px;
  /* Seconde ligne juxtaposée de couleur différente */
  border-left: 2px dashed var(--vp-c-brand-2, #10b981); 
}

.sub-marker {
  left: -26px;
  top: 10px;
  width: 10px;
  height: 10px;
  background-color: var(--vp-c-brand-2, #10b981);
}

.sub-content {
  background-color: var(--vp-c-bg-alt);
  padding: 8px 12px;
  margin-bottom: 10px;
}

.sub-date {
  color: var(--vp-c-brand-2, #10b981);
  font-size: 0.9em;
}

.sub-title {
  font-size: 0.95em;
  font-weight: 500;
}

.sub-body {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--vp-c-divider);
  font-size: 0.9em;
  line-height: 1.4;
}
</style>