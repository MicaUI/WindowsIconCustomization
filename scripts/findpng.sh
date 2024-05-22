#!/bin/bash 

cd ../
pwd

# 使用find命令在当前目录及其子目录中查找所有的.png文件  
# find . -type f -name "*.png" -print  > 

#!/bin/bash  
  
# 初始化一个空数组来存储文件路径  
png_files=()  
  
# 使用find命令查找所有的.png文件，并将结果存储到数组中  
while IFS= read -r -d '' file; do  
    png_files+=("$file")  
done < <(find . -type f -name "*.png" -print0)  
  
# 使用jq来构建JSON数组，并将结果写入到文件中  
# 注意：这里假设jq已经安装在你的系统上  
echo '[' > png_files.json  
first=true  
for file in "${png_files[@]}"; do  
    if [[ "$first" == true ]]; then  
        first=false  
        echo "\"$file\"" >> png_files.json  
    else  
        echo ",\"$file\"" >> png_files.json  
    fi  
done  
echo ']' >> png_files.json  


# 或者，你可以使用jq的--args和--raw-input选项来简化构建JSON的过程  
# jq -n --args "${png_files[@]}" '{"files": $ARGS.positional | map_values(tostring)}' > png_files.json


echo "----------------------------分割线----------------------------"

cat ./png_files.json

echo "----------------------------分割线----------------------------"

