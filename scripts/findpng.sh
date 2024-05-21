#!/bin/bash 

cd ../
pwd

# 使用find命令在当前目录及其子目录中查找所有的.png文件  
# find . -type f -name "*.png" -print  > 
# 初始化一个空数组来存储文件路径  
png_files=()  
  
# 使用find命令查找所有的.png文件，并将结果存储到数组中  
while IFS= read -r -d '' file; do  
    png_files+=("$file")  
done < <(find . -type f -name "*.png" -print0)  
  
# 使用jq来构建JSON数组，并将结果写入到文件中  
#jq -n --args "${png_files[@]}" '{"files": $ARGS.positional}' > png_files.json

# 如果不想使用jq的fromentries，可以简单地创建一个只包含路径的数组  
jq -n --args "${png_files[@]}" 'args.positional | { "files": . }' > png_files.json

echo "----------------------------分割线----------------------------"

cat ./png_files.json

echo "----------------------------分割线----------------------------"

