args <- commandArgs(trailingOnly = TRUE)
start <- args[1];
id <- args[2]

# calculate results
# but I am going to fake it
result <- c('Zeno', 'Pickles', 'Levels');
filename <- paste("public/", id, ".log", sep="")
write(result, filename)