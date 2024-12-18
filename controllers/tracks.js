const Track = require('../models/track.js')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const createdTrack = await Track.create(req.body)
    res.status(201).json(createdTrack)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/', async (req, res) => {
  try {
    const foundTracks = await Track.find()
    res.status(200).json(foundTracks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

router.get('/:TrackId', async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.TrackId)
    if (!foundTrack) {
      res.status(404)
      throw new Error('Track not found.')
    }
    res.status(200).json(foundTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.delete('/:TrackId', async (req, res) => {
  try {
    let deletedTrack = await Track.findByIdAndDelete(req.params.TrackId)
    if (!deletedTrack) {
      res.status(404)
      throw new Error('Track not found.')
    }
    res.status(200).json(deletedTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

router.put('/:TrackId', async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.TrackId,
      req.body,
      {
        new: true
      }
    )
    if (!updatedTrack) {
      res.status(404)
      throw new Error('Track not found.')
    }
    res.status(200).json(updatedTrack)
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message })
    } else {
      res.status(500).json({ error: error.message })
    }
  }
})

module.exports = router
