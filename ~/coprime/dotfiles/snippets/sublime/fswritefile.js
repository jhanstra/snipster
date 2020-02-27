fs.writeFile(${1:path}, ${2:data}, (err) => {
  if (err) throw err
  $3
}