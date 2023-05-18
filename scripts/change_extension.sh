folder_path="/Users/skhan/Documents/orange_react_frontend/config"
old_extension=".ts"
new_extension=".js"

change_extension() {
    # for files in /Users/skhan/Documents/orange_react_frontend/*
    for file in "$1"/*; do
        # If the file is a file
        if [ -f "$file" ]; then
            # then check if its extension matches the old extension
            if [[ $file == *"$old_extension" ]]; then
                # create a new file with new extension and old file name
                new_file="${file%$old_extension}$new_extension"
                # move content from original file to new file
                mv "$file" "$new_file"
                echo "Renamed $file to $new_file"
            fi
        # if file is actually a folder
        elif [ -d "$file" ]; then
            # call the traverse function again to change extentions in it
            change_extension "$file"
        fi
    done
}

change_extension "$folder_path"