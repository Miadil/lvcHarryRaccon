const express = require('express')
const mysql = require('../config/db')
const router = express.Router()

router.get('/', (req, res) => {
  // All character
  const sql = `
	SELECT ch.*, h.houseName
	FROM characters as ch
		LEFT join houses as h
			ON ch.houses_id = h.id
	`
  mysql.query(sql, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving data from database')
    } else {
      console.table(result)
      res.status(200).json(result)
    }
  })
})

router.post('/', (req, res) => {
  const bodyData = [
    req.body.firstname,
    req.body.actorName,
    req.body.image,
    req.body.house_id
  ]
  console.log(bodyData)
  const sql = `
	INSERT INTO characters
	(name, actorName, image, houses_id)
	VALUES (?,?,?,?)
	`
  mysql.query(sql, bodyData, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } else {
      res.status(200).json(result)
    }
  })
})

module.exports = router
