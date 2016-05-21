class Sample
  def initialize(hsh)
    @hsh = Hash[hsh.collect { |k, v| [k.to_s, v] }]
  end

  def method_missing(name)
    if @hsh[name.to_s]
      @hsh[name.to_s]
    else
      super
    end
  end
end

def example
  h = {"this" => [1,2,3,4,5,6], "that" => ['here', 'there', 'everywhere'], :other => 'here'}
  c = Sample.new(h)
  puts c.this
  puts c.that
  puts c.other
end

example
