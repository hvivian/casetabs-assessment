require 'json'

class String
  def to_hash
    s = drop_unbalanced_tokens("[", "]")
    s.build_hash
  end

  def integer?
    true if Integer(self) rescue false
  end

  def drop_ends
    self[1..self.length-2]
  end

  # Build a hash by searching through a balanced string representation of a hash.
  # Supports arrays and string values, and string and integer keys.
  def build_hash
    # Drop starting and closing parentheses
    s = self
    s = drop_ends if self[0] == "{" && self[-1] == "}"
    h = {}
    key = ""
    key_set = false
    skip_to = 0
    s.split("").each_with_index { |c, idx|
      next if idx < skip_to
      skip_to = 0
      if key_set
        if c == "["
          val_str = s[idx..s.length-1].to_balanced("[", "]")
          val = val_str.build_array
        else
          remaining = s[idx-1..s.length-1]
          end_idx = remaining.index(",") || s.length - 1
          val_str = s[idx..end_idx]
          val = val_str
        end

        # set the key's value and skip to the next character after the value
        skip_to = idx + val_str.length
        h[key] = val
        key_set = false
        key = ""
      else
        key += c unless [",", ":"].include?(c)
        key_set = c == ":"
        h[key] = nil if key_set
      end
    }

    Hash[h.collect { |k, v|
      [k.strip.integer? ? k.strip.to_i : k.strip, v]
    }]
  end

  # Iterate through all the characters in the given string s, keeping track
  # of all of the opening and closing delimeters that we see.  If we see 
  # too many closing delimeters, simply drop them.
  def drop_unbalanced_tokens(start_token, end_token)
    start_count = 0
    split("").select { |c|
      start_count += 1 if c == start_token
      start_count -= 1 if c == end_token
      valid_token = start_count >= 0
      start_count = 0 unless valid_token
      valid_token
    }.join
  end

  # Return the first string that is balanced with start_token and end_token as delimeters
  def to_balanced(start_token, end_token)
    start_count = 0
    split("").select.with_index { |c, idx|
      next if idx > 0 && start_count == 0
      start_count += 1 if c == start_token
      start_count -= 1 if c == end_token
      start_count >= 0
    }.join
  end

  # Build an array from a string. Assumes that nested arrays are separated by a single ,
  def build_array
    if self[0] == "["
      arr = to_balanced("[", "]")
      a = arr.drop_ends.build_array
      if arr.length == length
        a
      else
        [a, self[arr.length+1..self.length-1].build_array]
      end
    else
      split(",").map { |s| s.strip }
    end
  end
end


def solution_to_problem_one
  string = "{ key:[[value_1, value_2],[value_3, value4]], 5:10:00AM]}"
  h = string.to_hash
  h.to_json
end

puts solution_to_problem_one
