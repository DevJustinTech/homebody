import { useEffect, useState } from 'react'
import {
  Desktop,
  DownloadSimple,
  Info,
  Moon,
  PersonSimple,
  SpeakerHigh,
  Sun,
  Trash,
} from '@phosphor-icons/react'
import { clearHistory, exportData, setProfile, setSettings, useStore } from '../lib/store.js'

export default function Settings() {
  const { settings, profile, logs } = useStore()
  const [confirmClear, setConfirmClear] = useState(false)
  const [installEvent, setInstallEvent] = useState(null)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const onPrompt = event => {
      event.preventDefault()
      setInstallEvent(event)
    }
    const onInstalled = () => setInstalled(true)
    window.addEventListener('beforeinstallprompt', onPrompt)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('beforeinstallprompt', onPrompt)
      window.removeEventListener('appinstalled', onInstalled)
    }
  }, [])

  function download() {
    const blob = new Blob([exportData()], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `homebody-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function install() {
    if (!installEvent) return
    installEvent.prompt()
    const choice = await installEvent.userChoice
    if (choice.outcome === 'accepted') setInstalled(true)
    setInstallEvent(null)
  }

  return (
    <div className="page settings-page">
      <header className="page-head">
        <div>
          <p className="eyebrow">Settings</p>
          <h1>Make it fit you.</h1>
          <p className="page-lede">
            Everything here lives on this device. There is no account, no sync, and
            no server holding a copy.
          </p>
        </div>
      </header>

      <div className="settings-grid">
        <section className="settings-block">
          <div className="settings-block-head">
            <h2>Appearance</h2>
            <p>Light, dark, or follow the system.</p>
          </div>
          <div className="segmented" role="group" aria-label="Theme">
            {[
              ['system', 'System', Desktop],
              ['light', 'Light', Sun],
              ['dark', 'Dark', Moon],
            ].map(([value, label, Icon]) => (
              <button
                key={value}
                type="button"
                className={settings.theme === value ? 'is-on' : ''}
                onClick={() => setSettings({ theme: value })}
              >
                <Icon size={17} /> {label}
              </button>
            ))}
          </div>
        </section>

        <section className="settings-block">
          <div className="settings-block-head">
            <h2>Sound</h2>
            <p>A short tone when work and rest change.</p>
          </div>
          <label className="switch-row">
            <span>
              <SpeakerHigh size={18} />
              Session cues
            </span>
            <input
              type="checkbox"
              checked={settings.sound}
              onChange={event => setSettings({ sound: event.target.checked })}
            />
          </label>
        </section>

        <section className="settings-block">
          <div className="settings-block-head">
            <h2>Motion</h2>
            <p>Freeze the exercise figures on their clearest frame.</p>
          </div>
          <label className="switch-row">
            <span>
              <PersonSimple size={18} />
              Reduce animation
            </span>
            <input
              type="checkbox"
              checked={settings.reduceMotion}
              onChange={event => setSettings({ reduceMotion: event.target.checked })}
            />
          </label>
        </section>

        <section className="settings-block">
          <div className="settings-block-head">
            <h2>Name</h2>
            <p>Optional. Only used for the greeting on the home screen.</p>
          </div>
          <label className="field">
            <span>What should we call you?</span>
            <input
              type="text"
              value={profile.name}
              maxLength={40}
              placeholder="First name or nickname"
              onChange={event => setProfile({ name: event.target.value })}
            />
          </label>
        </section>

        <section className="settings-block">
          <div className="settings-block-head">
            <h2>Install</h2>
            <p>Add homebody to your home screen for offline sessions.</p>
          </div>
          {installed ? (
            <p className="settings-note">Installed. It should be on your home screen.</p>
          ) : installEvent ? (
            <button type="button" className="btn btn-primary" onClick={install}>
              Install homebody
            </button>
          ) : (
            <p className="settings-note">
              Use your browser’s <strong>Install</strong> or <strong>Add to Home Screen</strong> option.
              On desktop Chrome, look for the install icon in the address bar.
            </p>
          )}
        </section>

        <section className="settings-block">
          <div className="settings-block-head">
            <h2>Your data</h2>
            <p>{logs.length} sessions stored on this device.</p>
          </div>
          <div className="settings-actions">
            <button type="button" className="btn btn-quiet" onClick={download}>
              <DownloadSimple size={17} /> Export JSON
            </button>
            {!confirmClear ? (
              <button type="button" className="btn btn-quiet" onClick={() => setConfirmClear(true)}>
                <Trash size={17} /> Clear history
              </button>
            ) : (
              <div className="inline-confirm">
                <span>Delete all {logs.length} sessions?</span>
                <button
                  type="button"
                  className="btn btn-primary btn-small"
                  onClick={() => {
                    clearHistory()
                    setConfirmClear(false)
                  }}
                >
                  Delete
                </button>
                <button type="button" className="text-btn" onClick={() => setConfirmClear(false)}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="settings-block settings-about">
          <div className="settings-block-head">
            <h2>About</h2>
            <p>Home training, without the gym.</p>
          </div>
          <p className="settings-note">
            <Info size={16} /> homebody is a free, local-first exercise library for
            people training at home. All figures are original SVG animations drawn
            joint by joint. No exercise media is copied from another product.
          </p>
          <p className="settings-note">
            No account. No analytics. No ads. If you find a cue that could be
            clearer or safer, improve it and pass it on.
          </p>
          <p className="settings-version">Version 0.1 · Made to be shared</p>
        </section>
      </div>
    </div>
  )
}
