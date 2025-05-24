<template>
    <div class="admin-dashboard">
      <h1>Firestore Admin Console</h1>

      <div v-for="(col, name) in collections" :key="name" class="collection">
        <h2>{{ name }}</h2>
        <button @click="addDoc(name)">+ New</button>

        <div v-if="col.docs.length === 0" class="empty">
          (no documents yet)
        </div>

        <div v-for="doc in col.docs" :key="doc.id" class="doc-card">
          <header>
            <strong>ID:</strong> {{ doc.id }}
          </header>
          <textarea v-model="doc.raw" rows="6" class="json-editor"></textarea>
          <div class="actions">
            <button @click="saveDoc(name, doc)">Save</button>
            <button @click="deleteDoc(name, doc.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>

  <script>
  import { db } from '@/services/firebase'

  export default {
    name: 'AdminDashboard',
    data() {
      return {
        collections: {
          personal:   { ref: db.collection('personal'),   docs: [] },
          experience: { ref: db.collection('experience'), docs: [] },
          skills:     { ref: db.collection('skills'),     docs: [] },
          projects:   { ref: db.collection('projects'),   docs: [] },
          education:  { ref: db.collection('education'),  docs: [] },
        },
      }
    },
    async created() {
      // fetch all docs once
      for (const name in this.collections) {
        const { ref } = this.collections[name]
        const snap = await ref.get()
        this.collections[name].docs = snap.docs.map(d => ({
          id:  d.id,
          raw: JSON.stringify(d.data(), null, 2),
        }))
      }
    },
    methods: {
      async saveDoc(colName, doc) {
        try {
          const data = JSON.parse(doc.raw)
          await this.collections[colName].ref.doc(doc.id).set(data)
          alert(`✔️ Saved ${colName}/${doc.id}`)
        } catch (e) {
          alert('❌ JSON error: ' + e.message)
        }
      },
      async deleteDoc(colName, id) {
        if (!confirm(`Delete ${colName}/${id}?`)) return
        await this.collections[colName].ref.doc(id).delete()
        this.collections[colName].docs =
          this.collections[colName].docs.filter(d => d.id !== id)
      },
      addDoc(colName) {
        const id = this.collections[colName].ref.doc().id
        this.collections[colName].docs.push({ id, raw: '{}' })
      },
    },
  }
  </script>

  <style scoped>
  .admin-dashboard {
    padding: 2rem;
    font-family: sans-serif;
  }
  .collection {
    margin-bottom: 2rem;
    border-top: 1px solid #ccc;
    padding-top: 1rem;
  }
  .collection h2 {
    text-transform: capitalize;
  }
  .doc-card {
    background: #f9f9f9;
    padding: 1rem;
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  .json-editor {
    width: 100%;
    font-family: monospace;
    margin: 0.5rem 0;
  }
  .actions button {
    margin-right: 0.5rem;
  }
  .empty {
    font-style: italic;
    color: #666;
    margin-bottom: 1rem;
  }
  </style>
