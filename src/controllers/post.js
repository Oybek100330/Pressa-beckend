const timeConverter = require('../utils/timeConverter.js')
const { ClientError } = require('../utils/error.js')
const path = require('path')
const fs = require('fs')

const GET = (req, res, next) => {
	try {
		const { postId } = req.params
		const { 
			date,
			subcategory,
			format,
			name
		} = req.query

		let posts = req.select('posts')
		posts = posts.map(post => {
			post.date = timeConverter(post.date)
			return post
		})

		if(postId) {
			return res.json( posts.find(post => post.postId == postId))
		} 

		posts = posts.filter(post => {
			let dateFilter =  date ? post.date == date : true
			let subcategoryfilter =  subcategory ? post.subcategory == subcategory : true
			let formatfilter =  format ? post.format == format : true
			let namefilter =  name ? post.name == name : true
			
			return dateFilter && subcategoryfilter && formatfilter && namefilter
		})

		return res.json(posts)

	} catch(error) {
		return next(error)
	}
}

module.exports = {
	GET
}	