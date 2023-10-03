const express=require('express')
const router=express.Router()
const path=require('path')

router.get('/book', (req, res) => {
    res.sendFile(path.join(__dirname, '../','Views', 'book.html'));
});


module.exports=router