// app/components/AdminPage.tsx
'use client'

import { useState, useEffect } from 'react'
import {
  getDocs,
  collection,
  doc,
  setDoc,
  deleteDoc as deleteDocFromFS,
} from 'firebase/firestore'
import { db } from '../lib/firebase'
import { useStarfield } from '@/contexts/StarfieldContext'
import { useHeroImage } from '@/contexts/HeroImageContext'

interface DocEntry {
  id: string
  raw: string
}

type CollectionsState = Record<string, DocEntry[]>

export default function AdminPage() {
  const [collections, setCollections] = useState<CollectionsState>({})
  const { starfieldOn, toggleStarfield } = useStarfield()
  const { heroImageMode, setHeroImageMode } = useHeroImage()

  useEffect(() => {
    const names = ['hero', 'about', 'skills', 'experience', 'projects', 'education', 'footer']

    async function fetchAll() {
      const result: CollectionsState = {}
      for (const name of names) {
        const colRef = collection(db, name)
        const snap = await getDocs(colRef)
        result[name] = snap.docs.map(d => ({
          id: d.id,
          raw: JSON.stringify(d.data(), null, 2),
        }))
      }
      setCollections(result)
    }

    fetchAll()
  }, [])

  const saveDoc = async (colName: string, entry: DocEntry) => {
    try {
      const data = JSON.parse(entry.raw)
      const docRef = doc(db, colName, entry.id)
      await setDoc(docRef, data)
      alert(`✓ Saved ${colName}/${entry.id}`)
    } catch (err: unknown) {
      let msg = 'Unknown error'
      if (err instanceof Error) msg = err.message
      alert('✗ JSON parse error: ' + msg)
    }
  }

  const deleteDoc = async (colName: string, id: string) => {
    if (!confirm(`Delete ${colName}/${id}?`)) return
    const docRef = doc(db, colName, id)
    try {
      await deleteDocFromFS(docRef)
      setCollections(prev => ({
        ...prev,
        [colName]: prev[colName].filter(d => d.id !== id)
      }))
    } catch (err: unknown) {
      let msg = 'Unknown error'
      if (err instanceof Error) msg = err.message
      alert('✗ Delete failed: ' + msg)
    }
  }

  const addDoc = (colName: string) => {
    const newId = doc(collection(db, colName)).id
    setCollections(prev => ({
      ...prev,
      [colName]: [...(prev[colName] ?? []), { id: newId, raw: '{}' }]
    }))
  }

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: 24, marginBottom: 16 }}>Firestore Admin Console</h1>

      <div style={{ marginBottom: 24, padding: 12, backgroundColor: '#f3f4f6', borderRadius: 8 }}>
        <span style={{ marginRight: 8, fontWeight: 500 }}>Gold mode starfield:</span>
        <button
          type="button"
          onClick={toggleStarfield}
          style={{
            padding: '6px 14px',
            backgroundColor: starfieldOn ? '#b45309' : '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          {starfieldOn ? 'On' : 'Off'}
        </button>
        <span style={{ marginLeft: 8, color: '#6b7280', fontSize: 14 }}>
          (takes effect when gold theme is active on the site)
        </span>
      </div>

      <div style={{ marginBottom: 24, padding: 12, backgroundColor: '#f3f4f6', borderRadius: 8 }}>
        <span style={{ marginRight: 8, fontWeight: 500 }}>Hero image:</span>
        <button
          type="button"
          onClick={() => setHeroImageMode('current')}
          style={{
            padding: '6px 14px',
            marginRight: 8,
            backgroundColor: heroImageMode === 'current' ? '#1f2937' : '#e5e7eb',
            color: heroImageMode === 'current' ? 'white' : '#374151',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Current style
        </button>
        <button
          type="button"
          onClick={() => setHeroImageMode('full')}
          style={{
            padding: '6px 14px',
            backgroundColor: heroImageMode === 'full' ? '#1f2937' : '#e5e7eb',
            color: heroImageMode === 'full' ? 'white' : '#374151',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Full image
        </button>
        <span style={{ marginLeft: 8, color: '#6b7280', fontSize: 14 }}>
          (current = masked/zoomed, full = whole image visible)
        </span>
      </div>

      {Object.entries(collections).map(([name, docs]) => (
        <section key={name} style={{ marginBottom: 32 }}>
          <h2 style={{ textTransform: 'capitalize', fontSize: 20, marginBottom: 8 }}>
            {name}
          </h2>
          <button
            onClick={() => addDoc(name)}
            style={{
              padding: '6px 12px',
              backgroundColor: '#4b5563',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            + New
          </button>

          {docs.length === 0 && (
            <p style={{ fontStyle: 'italic', color: '#666', marginTop: 8 }}>
              (no documents yet)
            </p>
          )}

          {docs.map(entry => (
            <div
              key={entry.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: 4,
                padding: 12,
                marginTop: 12,
                backgroundColor: '#f9fafb'
              }}
            >
              <header>
                <strong>ID:</strong> {entry.id}
              </header>

              <textarea
                value={entry.raw}
                onChange={e => {
                  const updated = e.target.value
                  setCollections(prev => ({
                    ...prev,
                    [name]: prev[name].map(d =>
                      d.id === entry.id ? { ...d, raw: updated } : d
                    )
                  }))
                }}
                rows={6}
                style={{
                  width: '100%',
                  fontFamily: 'monospace',
                  margin: '8px 0',
                  padding: 8,
                  borderRadius: 4,
                  border: '1px solid #ccc',
                  resize: 'vertical'
                }}
              />

              <div>
                <button
                  onClick={() => saveDoc(name, entry)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#1f2937',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    marginRight: 8
                  }}
                >
                  Save
                </button>
                <button
                  onClick={() => deleteDoc(name, entry.id)}
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#b91c1c',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}
