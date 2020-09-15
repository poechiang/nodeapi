import { Db } from '../../../core/database';
export const method = 'post';

/**
 * 检查指定分组是否存在，如不存在则插入，并返回正确的id
 *
 * @return                            {[type]} [description]
 * @author		poe.ch
 * @DateTime	2020-09-15T00:52:37+0800
 * @version		1.0.0
 */
const checkCatagory = async (cata) => {

  let old = await Db.table('catagory').get(`title='${cata}'`)
  if (old) {
    return old.id;
  }
  old = await Db.table('catagory').append({ title: cata, status: 1 })

  return old.insertId;

}
const handlePost = async (req, res, next) => {
  const { id, title, catagory, tags, content } = req.body

  let catagory_id = await checkCatagory(catagory)

  let art = await Db.table('article').append({
    title,
    catagory_id,
    tags: (tags || []).join(','),
    content
  })
  if (art) {
    art.id = art.insertId;
    delete art.insertId;
    res.send({ code: 200, msg: 'Success', result: art });
  } else {
    console.error(err)
    res.send({ code: err.code || 400, msg: err.msg || err });
  }

}

export default handlePost;
