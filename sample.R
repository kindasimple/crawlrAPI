args <- commandArgs(trailingOnly = TRUE)
start <- args[1];

# calculate results
# but I am going to fake it
result <- c('Zeno', 'Pickles', 'Levels');

write(result, "result.log")