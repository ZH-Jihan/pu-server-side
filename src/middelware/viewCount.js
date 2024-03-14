let i =0;
const viewCount = (req,res,next)=>{
i++
console.log(i);
next()
}

module.exports = viewCount;