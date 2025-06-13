# shorten_csv.py
input_file = "data/users.csv"
lines_per_file = 70000

with open(input_file, "r", encoding="utf-8") as fin:
    file_count = 1
    line_count = 0
    fout = open(f"users_part_{file_count}.csv", "w", encoding="utf-8")
    for line in fin:
        if line_count >= lines_per_file:
            fout.close()
            file_count += 1
            fout = open(f"users_part_{file_count}.csv", "w", encoding="utf-8")
            line_count = 0
        fout.write(line)
        line_count += 1
    fout.close()